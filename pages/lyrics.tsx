import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import { useMusicStore } from "@contexts/MusicStore";
import { useSelectMusic } from "@contexts/SelectMusic";

export default function Lyrics() {
    const route = useRouter();
    const musicStore = useMusicStore();
    const selectedMusic = useSelectMusic();
    const [res, setRes] = useState(route.query?.lyrics || "");
    useEffect(() => {
        if (Object.keys(route.query).length === 0) return;
        let { song, artist, id, lyrics } = route.query;
        if (
            // if they do not exist, return
            !song &&
            !artist &&
            !id &&
            lyrics !== ""
        )
            return;
        fetch(`/api/lyrics?song=${song}&artist=${artist}`)
            .then(r => r.json())
            .then((r: any) => {
                setRes(r.lyrics);

                if (id === "") return;
                let index = musicStore.value.findIndex(t => t.id === id);
                if (index !== -1) {
                    musicStore.setValue(prev => {
                        let temp = [...prev];
                        temp[index].lyrics = r.lyrics;
                        return temp;
                    });
                }
                selectedMusic.setValue(prev => {
                    let temp = { ...prev };
                    temp.lyrics = r.lyrics;
                    return temp;
                });
            })
            .catch(() => {});

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]);

    return (
        <>
            <Head>
                <title>
                    Lyrics - {route.query?.song} by {route.query?.artist}
                </title>
            </Head>
            <MainBody title="Lyrics">
                <pre className={styles.lyrics}>
                    {res}
                    <br />
                    <br />
                    <br />
                </pre>
            </MainBody>
        </>
    );
}
