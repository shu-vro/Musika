import { useMusicStore } from "@contexts/MusicStore";
import styles from "@styles/Songs.module.scss";
import SongList from "./SongList";

export default function Songs() {
    const { value: musicStore, setQueue } = useMusicStore();

    return (
        <>
            <div className={styles.songs}>
                {musicStore.map(song => (
                    <div
                        key={song.id}
                        onClick={() => {
                            setQueue(musicStore);
                        }}>
                        <SongList song={song} />
                    </div>
                ))}
            </div>
        </>
    );
}
