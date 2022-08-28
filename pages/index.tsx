import Link from "next/link";
import Image from "next/image";
import { BsPlayCircle } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from "@styles/Home.module.scss";
import MainBody from "@components/MainBody";
import defaultImage from "../assets/photo.jpg";
import { useMusicStore } from "@contexts/MusicStore";

export default function Home() {
    let musicStore = useMusicStore().value;
    return (
        <MainBody title="Play List">
            <div className={styles.playlists}>
                <Link href="playlist/1">
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
                        <div className={styles["playlist-title"]}>All</div>
                        <div className={styles["playlist-description"]}>
                            Some description
                        </div>
                        <div className={styles["playCursor"]}>
                            <BsPlayCircle size="4rem" />
                        </div>
                    </div>
                </Link>
                <div className={`ripple ${styles.playlist}`}>
                    <div className={styles.addPlaylist}>
                        <IoIosAddCircleOutline size="4rem" color="#aaa" />
                    </div>
                    <div className={styles["playlist-title"]}>Add</div>
                </div>
            </div>
        </MainBody>
    );
}
