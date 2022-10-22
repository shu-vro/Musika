import { HTMLAttributes } from "react";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { useRouter } from "next/router";
import { GiMusicalScore } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "@styles/Songs.module.scss";
import { normalizeTimeFormat } from "@utils/utils";
import { IAudioMetadata } from "@ts/types";
import { useSelectMusic } from "@contexts/SelectMusic";
import MoreButton from "./MoreButton";
import { useMusicStore } from "@contexts/MusicStore";
import defaultImage from "@assets/disk.png";

interface SongListProps extends HTMLAttributes<HTMLDivElement> {
    song: IAudioMetadata;
    cb?: VoidFunction;
    searching?: {
        state: boolean;
        key: string;
        value: string;
    };
}
export default function SongList({
    song,
    cb = () => null,
    searching = {
        state: false,
        key: "",
        value: "",
    },
    ...rest
}: SongListProps) {
    const {
        setNext,
        setValue: selectMusic,
        value: selectedMusic,
    } = useSelectMusic();
    const router = useRouter();
    const { deleteTrack } = useMusicStore();

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
        {
            name: "Delete",
            icon: <AiOutlineDelete size="1.3rem" />,
            cb: () => {
                deleteTrack(song, true);
            },
        },
    ];
    return (
        <div
            className={`ripple ${styles.song}`}
            key={song.id}
            onClick={() => {
                selectMusic(song);
                cb();
            }}
            {...rest}
        >
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={song.picture?.["92x92"] || defaultImage.src}
                    alt={song.trackName}
                />
                <div className={styles["song-title"]}>{song.trackName}</div>
            </div>
            {searching.state ? (
                <>
                    {searching.key}: {searching.value}
                </>
            ) : (
                <>
                    <i className={styles["song-artist"]}>{song.artist}</i>
                    <b>{normalizeTimeFormat(song.duration)}</b>
                </>
            )}
            <MoreButton buttons={buttons} />
        </div>
    );
}
