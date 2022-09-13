import React from "react";
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
    const selectMusic = useSelectMusic().setValue;
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
            <MoreButton song={song} />
        </div>
    );
}
