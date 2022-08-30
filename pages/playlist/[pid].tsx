import { useRouter } from "next/router";
import { useEffect } from "react";
import MainBody from "@components/MainBody";
import defaultImage from "../../assets/photo.jpg";
import styles from "@styles/Songs.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import { normalizeTimeFormat } from "@utils/utils";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import { useSelectMusic } from "@contexts/SelectMusic";

export default function PlayList() {
    const router = useRouter();
    const musicStore = useMusicStore().value;
    const selectMusic = useSelectMusic().setValue;
    const rippleRefresh = useRippleRefresh();

    useEffect(() => {
        let { pid } = router.query;
        if (!pid) return;

        // pid will be Nan, other playlist
    }, [router]);

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
                        <div
                            className={`ripple ${styles.song}`}
                            key={song.id}
                            onClick={() => selectMusic(song)}>
                            <div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={
                                        song.picture || "../../assets/disk.png"
                                    }
                                    alt={song.trackName}
                                />
                                <div className="song-title">
                                    {song.trackName}
                                </div>
                            </div>
                            <i className="song-artist">{song.artist}</i>
                            <b>{normalizeTimeFormat(song.duration)}</b>
                        </div>
                    ))}
                </div>
            </MainBody>
        </>
    );
}
