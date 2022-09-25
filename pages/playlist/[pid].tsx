import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainBody from "@components/MainBody";
import defaultImage from "../../assets/photo.jpg";
import styles from "@styles/Songs.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import SongList from "@components/Index/SongList";
import Head from "next/head";

export default function PlayList() {
    const router = useRouter();
    const {
        queue: musicStore,
        getFromField,
        setQueue: setQueueStore,
    } = useMusicStore();
    const rippleRefresh = useRippleRefresh();
    const { pid, name }: any = router.query;
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        rippleRefresh.refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicStore]);

    useEffect(() => {
        if (!pid || !name) return;
        if (pid !== `playlist`) {
            setQueue(getFromField({ [pid]: name }));
        } else if (name === "all") {
            setQueue(musicStore);
        }
    }, [getFromField, musicStore, name, pid]);

    return (
        <>
            <Head>
                <title>
                    {pid} - {name} - MUSIKA
                </title>
            </Head>
            <MainBody title="Songs">
                <div className={styles.songs}>
                    <div className={styles.image}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={
                                queue?.[0]?.picture?.["original"] ||
                                defaultImage.src
                            }
                            alt="song"
                        />
                        <div>
                            <p>{pid}</p>
                            <h1>{name}</h1>
                        </div>
                    </div>
                    {queue.map(song => (
                        <SongList
                            key={song.id}
                            song={song}
                            cb={() => {
                                setQueueStore(queue);
                            }}
                        />
                    ))}
                </div>
            </MainBody>
        </>
    );
}
