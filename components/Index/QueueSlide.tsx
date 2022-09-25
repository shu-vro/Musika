import { HTMLAttributes } from "react";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { useRouter } from "next/router";
import { GiMusicalScore } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { ReactSortable } from "react-sortablejs";
import { normalizeTimeFormat } from "@utils/utils";
import { IAudioMetadata } from "@ts/types";
import { useSelectMusic } from "@contexts/SelectMusic";
import MoreButton from "./MoreButton";

import { useMusicStore } from "@contexts/MusicStore";
import styles from "@styles/Songs.module.scss";

export default function QueueSlide() {
    const { queue, setQueue } = useMusicStore();

    return (
        <>
            <ReactSortable
                className={styles.songs}
                list={queue}
                setList={setQueue}
                swap
                handle=".handle"
            >
                {queue.map(song => (
                    <div key={song.id}>
                        <QueueSongList song={song} />
                    </div>
                ))}
            </ReactSortable>
        </>
    );
}

interface QuerySongListProps extends HTMLAttributes<HTMLDivElement> {
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
            icon: <BsFillInfoCircleFill size="1.3rem" />,
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
