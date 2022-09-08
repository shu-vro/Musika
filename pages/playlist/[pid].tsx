import { useRouter } from "next/router";
import { useEffect } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import MainBody from "@components/MainBody";
import defaultImage from "../../assets/photo.jpg";
import styles from "@styles/Songs.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import SongList from "@components/Index/SongList";

export default function PlayList() {
    const router = useRouter();
    const { queue: musicStore } = useMusicStore();
    const rippleRefresh = useRippleRefresh();

    useEffect(() => {
        rippleRefresh.refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicStore]);

    return (
        <>
            <MainBody title="Songs">
                <div className={styles.songs}>
                    <div className={styles.image}>
                        <RiArrowGoBackLine
                            size="1.5rem"
                            className={styles.backIcon}
                            onClick={() => {
                                router.back();
                            }}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={musicStore?.[0]?.picture || defaultImage.src}
                            alt="song"
                        />
                        <h1>Playlist Name</h1>
                    </div>
                    {musicStore.map(song => (
                        <SongList key={song.id} song={song} />
                    ))}
                </div>
            </MainBody>
        </>
    );
}
