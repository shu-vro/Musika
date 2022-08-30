import Link from "next/link";
import Image from "next/image";
import styles from "@styles/Playlist.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import defaultImage from "../../assets/disk.png";
import { BsPlayCircle } from "react-icons/bs";

export default function Artists() {
    const musicStore = useMusicStore().value;
    let artistNames = musicStore.map(track => track.artist);

    return (
        <>
            <div className={styles.playlists}>
                {artistNames.map((name, i) => (
                    <Link href={`artist?name=${name}`} key={i}>
                        <div className={`ripple ${styles.playlist}`}>
                            <div className={styles.image}>
                                {Array(4)
                                    .fill("")
                                    .map((a, i) => (
                                        <Image
                                            src={
                                                musicStore?.[i]?.picture ||
                                                defaultImage
                                            }
                                            alt="playlist"
                                            objectFit="contain"
                                            width={65}
                                            height={65}
                                            key={i}
                                        />
                                    ))}
                            </div>
                            <div className={styles["playlist-title"]}>
                                {name}
                            </div>
                            <div className={styles.playCursor}>
                                <BsPlayCircle size="4rem" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
