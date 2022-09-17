import { MdOutlineQueuePlayNext } from "react-icons/md";
import { useRouter } from "next/router";
import { GiMusicalScore } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import styles from "@styles/Songs.module.scss";
import { normalizeTimeFormat } from "@utils/utils";
import { IAudioMetadata } from "@ts/types";
import { useSelectMusic } from "@contexts/SelectMusic";
import MoreButton from "./MoreButton";

export default function SongList({
    song,
    cb = () => null,
    ...rest
}: {
    song: IAudioMetadata;
    cb?: VoidFunction;
    [x: string]: any;
}) {
    const {
        setNext,
        setValue: selectMusic,
        value: selectedMusic,
    } = useSelectMusic();
    const router = useRouter();
    return (
        <div
            className={`ripple ${styles.song}`}
            key={song.id}
            onClick={() => {
                selectMusic(song);
                cb();
            }}
            {...rest}>
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={song.picture || "../../assets/disk.png"}
                    alt={song.trackName}
                />
                <div className="song-title">{song.trackName}</div>
            </div>
            <i className="song-artist">{song.artist}</i>
            <b>{normalizeTimeFormat(song.duration)}</b>
            <MoreButton
                buttons={[
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
                ]}
            />
        </div>
    );
}