import Link from "next/link";
import Image from "next/image";
import styles from "@styles/Playlist.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import defaultImage from "../../assets/disk.png";
import { BsPlayCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { IArrayAudioMetaData } from "@ts/types";

export default function GroupSlide({ slideName }) {
    const { value: musicStore, getFromSearch } = useMusicStore();
    const [searchResults, setSearchResults] = useState<IArrayAudioMetaData[]>(
        []
    );
    useEffect(() => {
        setSearchResults(getFromSearch(slideName));
    }, [getFromSearch, musicStore, slideName]);

    return (
        <>
            <div className={styles.playlists}>
                {searchResults.map((arrayTracks, i) => (
                    <Link
                        href={`playlist/${slideName}?name=${arrayTracks[0][slideName]}`}
                        key={i}
                    >
                        <div className={`ripple ${styles.playlist}`}>
                            <div className={styles.image}>
                                {Array(4)
                                    .fill("")
                                    .map((a, i) => (
                                        <Image
                                            src={
                                                arrayTracks?.[i]?.picture?.[
                                                    "92x92"
                                                ] || defaultImage
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
                                {arrayTracks[0][slideName]}
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
