import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import { useSelectMusic } from "@contexts/SelectMusic";
import { useLoading } from "@contexts/Loading";
import axios from "axios";

export default function Lyrics() {
    const route = useRouter();
    const musicStore = useMusicStore();
    const selectedMusic = useSelectMusic();
    const [res, setRes] = useState(route.query?.lyrics || "");
    const { setValue: setLoading } = useLoading();

    useEffect(() => {
        if (Object.keys(route.query).length === 0) return;
        let { song, artist, id, lyrics } = route.query;
        if (
            // if they do not exist, return
            !song ||
            typeof artist !== "string" ||
            !id ||
            lyrics
        )
            return;

        (async () => {
            setLoading(true);
            try {
                let { data } = await axios.get(`/api/lyrics`, {
                    params: {
                        song,
                        artist: "",
                    },
                });
                if (data.fetched) {
                    setRes(data.lyrics);
                    musicStore.setUsingId(id as string, {
                        lyrics: data.lyrics,
                    });
                    selectedMusic.setValue(prev => {
                        let temp = { ...prev };
                        temp.lyrics = data.lyrics;
                        return temp;
                    });
                } else {
                    let { data } = await axios.get(`/api/lyrics`, {
                        params: {
                            song,
                            artist: artist.replace("unknown", ""),
                        },
                    });
                    setRes(data.lyrics);
                    musicStore.setUsingId(id as string, {
                        lyrics: data.lyrics,
                    });
                    selectedMusic.setValue(prev => {
                        let temp = { ...prev };
                        temp.lyrics = data.lyrics;
                        return temp;
                    });
                }
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]);

    return (
        <>
            <Head>
                <title>
                    Lyrics - {route.query?.song ? route.query.song : ""} by{" "}
                    {route.query?.artist ? route.query.artist : ""}
                </title>
            </Head>
            <MainBody title="Lyrics">
                <div className={styles.lyrics}>
                    <h2>
                        {route.query?.song} - {route.query?.artist}
                    </h2>
                    <pre>
                        {res}
                        <br />
                        <br />
                        <br />
                    </pre>
                </div>
            </MainBody>
        </>
    );
}
