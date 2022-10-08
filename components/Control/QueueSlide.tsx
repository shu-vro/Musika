import { forwardRef } from "react";
import Slide from "@mui/material/Slide";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { useRouter } from "next/router";
import { GiMusicalScore } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { ReactSortable } from "react-sortablejs";
import { TransitionProps } from "@mui/material/transitions";
import { normalizeTimeFormat } from "@utils/utils";
import { IAudioMetadata } from "@ts/types";
import { useSelectMusic } from "@contexts/SelectMusic";
import MoreButton from "../Index/MoreButton";
import { useMusicStore } from "@contexts/MusicStore";
import styles from "@styles/Songs.module.scss";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function QueueSlide({ open, setOpen }) {
    const { queue, setQueue } = useMusicStore();

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(false);
    };

    return (
        <>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                swipeAreaWidth={50}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    "&.MuiDrawer-root > .MuiPaper-root": {
                        height: `75%`,
                        overflow: "visible",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        background: `rgba(255, 255, 255, 0.2)`,
                        backdropFilter: `blur(10px)`,
                    },
                }}
            >
                <Box
                    sx={{
                        pb: 2,
                        height: "100%",
                        overflow: "auto",
                    }}
                >
                    <ReactSortable
                        className={styles.songs}
                        list={queue}
                        setList={setQueue}
                        swap
                        animation={150}
                        handle=".handle"
                    >
                        {queue.map(song => (
                            <div key={song.id}>
                                <QueueSongList song={song} />
                            </div>
                        ))}
                    </ReactSortable>
                </Box>
            </SwipeableDrawer>
        </>
    );
}

interface QuerySongListProps extends React.HTMLAttributes<HTMLDivElement> {
    song: IAudioMetadata;
    cb?: () => VoidFunction;
}

function QueueSongList({ song, cb = () => null, ...rest }: QuerySongListProps) {
    const {
        setNext,
        setValue: selectMusic,
        value: selectedMusic,
    } = useSelectMusic();
    const router = useRouter();

    const buttons = [
        {
            name: "Play Next",
            icon: <MdOutlineQueuePlayNext size="1.3rem" />,
            cb: () => {
                setNext(song);
            },
            rest: {
                disabled: song?.id === selectedMusic?.id,
            },
        },
        {
            name: "Music Details",
            icon: <BsInfoCircle size="1.3rem" />,
            cb: () => {
                router.push(`/info/song?musicId=${song?.id}`);
            },
        },
        {
            name: "Lyrics",
            icon: <GiMusicalScore size="1.3rem" />,
            cb: () => {
                router.push({
                    pathname: "/lyrics",
                    query: {
                        song: song?.trackName ?? "",
                        artist: song?.artist ?? "",
                        id: song?.id ?? "",
                        lyrics: song?.lyrics ?? "",
                    },
                });
            },
        },
        {
            name: "Go to Artist",
            icon: <FiExternalLink size="1.3rem" />,
            cb: () => {
                router.push(`/playlist/artist?name=${song.artist}`);
            },
        },
        {
            name: "Go to Album",
            icon: <FiExternalLink size="1.3rem" />,
            cb: () => {
                router.push(`/playlist/album?name=${song.album}`);
            },
        },
        {
            name: "Go to Genre",
            icon: <FiExternalLink size="1.3rem" />,
            cb: () => {
                router.push(`/playlist/genre?name=${song.genre}`);
            },
        },
    ];
    return (
        <div
            className={`ripple ${styles.song}`}
            onClick={() => {
                selectMusic(song);
                cb();
            }}
            {...rest}
        >
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="handle"
                    src={song.picture?.["92x92"] || "../../assets/disk.png"}
                    alt={song.trackName}
                />
                <div className={styles["song-title"]}>{song.trackName}</div>
            </div>
            <i className={styles["song-artist"]}>{song.artist}</i>
            <b>{normalizeTimeFormat(song.duration)}</b>
            <MoreButton buttons={buttons} />
        </div>
    );
}
