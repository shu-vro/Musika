import { useMusicStore } from "@contexts/MusicStore";
import { useSelectMusic } from "@contexts/SelectMusic";
import styles from "@styles/Songs.module.scss";
import { normalizeTimeFormat } from "@utils/utils";

export default function Songs() {
    const musicStore = useMusicStore().value;
    const selectMusic = useSelectMusic().setValue;

    return (
        <>
            <div className={styles.songs}>
                {musicStore.map(song => (
                    <div
                        className={`ripple ${styles.song}`}
                        key={song.id}
                        onClick={() => selectMusic(song)}>
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
                    </div>
                ))}
            </div>
        </>
    );
}
