import Link from "next/link";
import Image from "next/image";
import { BsPlayCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from "@styles/Playlist.module.scss";
import defaultImage from "../../assets/disk.png";
import { useMusicStore } from "@contexts/MusicStore";

export default function Playlist() {
    let { value: musicStore, setQueue } = useMusicStore();
    return (
        <div className={styles.playlists}>
            <Link href="/playlist/playlist?name=all">
                <div
                    className={`ripple ${styles.playlist}`}
                    onClick={() => setQueue(musicStore)}
                >
                    <div className={styles.image}>
                        {Array(4)
                            .fill("")
                            .map((a, i) => (
                                <Image
                                    src={
                                        musicStore?.[i]?.picture?.["92x92"] ||
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
                    <div className={styles["playlist-title"]}>All</div>
                    <div className={styles["playlist-description"]}>
                        All of your musics
                    </div>
                    <div className={styles["playCursor"]}>
                        <BsPlayCircle size="4rem" />
                    </div>
                </div>
            </Link>
            <div className={`ripple ${styles.playlist}`}>
                <div className={styles["playCursor"]}>
                    <IoIosAddCircleOutline size="4rem" color="#aaa" />
                </div>
                <div className={styles["playlist-title"]}>Add</div>
            </div>
        </div>
    );
}
