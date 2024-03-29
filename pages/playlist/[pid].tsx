import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainBody from "@components/MainBody";
import defaultImage from "../../assets/photo.jpg";
import styles from "@styles/Songs.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import SongList from "@components/Index/SongList";
import Head from "next/head";
import Image from "next/image";

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
                    {router.query?.pid ? pid : ""} -{" "}
                    {router.query?.name ? name : ""} - MUSIKA
                </title>
            </Head>
            <MainBody title="Songs">
                <div
                    className={styles.songs}
                    style={{
                        height: `calc(100% - 75px)`,
                    }}
                >
                    <div className={styles.image}>

                        {Array(4)
                            .fill("")
                            .map((a, i) => (
                                <Image
                                    src={
                                        queue?.[i]?.thumbnail?.["original"] ||
                                        defaultImage
                                    }
                                    alt="playlist"
                                    width={800}
                                    height={800}
                                    key={i}
                                />
                            ))}
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
