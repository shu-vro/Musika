import { useEffect, useState } from "react";
import MainBody from "@components/MainBody";
import defaultImage from "../../assets/photo.jpg";
import styles from "@styles/Songs.module.scss";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import SongList from "@components/Index/SongList";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

export default function PlayList() {
    const rippleRefresh = useRippleRefresh();
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        rippleRefresh.refresh();
        axios
            .get("/api/loadSongs")
            .then(({ data }) => {
                setQueue(data?.data);
            })
            .catch(e => {
                console.log(e);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>Online Store - MUSIKA</title>
            </Head>
            <MainBody title="Songs">
                <div className={styles.songs}>
                    <div className={styles.image}>
                        <Image
                            src={
                                queue?.[0]?.thumbnail?.["original"] ||
                                defaultImage
                            }
                            alt="song"
                            width={800}
                            height={800}
                        />
                        <div>
                            <p>playlist</p>
                            <h1>Online Store</h1>
                        </div>
                    </div>
                    {queue.map(song => (
                        <SongList key={song.id} song={song} cb={() => {}} />
                    ))}
                </div>
            </MainBody>
        </>
    );
}
