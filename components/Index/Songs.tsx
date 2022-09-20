import { useMusicStore } from "@contexts/MusicStore";
import styles from "@styles/Songs.module.scss";
import { IAudioOptionalMetadata } from "@ts/types";
import SongList from "./SongList";

export default function Songs({ filter = (e: IAudioOptionalMetadata) => e }) {
    const { value: musicStore, setQueue } = useMusicStore();

    return (
        <>
            <div className={styles.songs}>
                {musicStore.filter(filter).map(song => (
                    <SongList
                        song={song}
                        key={song.id}
                        cb={() => {
                            setQueue(musicStore.filter(filter));
                        }}
                    />
                ))}
            </div>
        </>
    );
}
