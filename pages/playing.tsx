import Head from "next/head";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import defaultImage from "@assets/disk.png";
import { useSelectMusic } from "@contexts/SelectMusic";

export default function Playing() {
    const selectedMusic = useSelectMusic().value;

    return (
        <>
            <Head>
                <title>Playing - {selectedMusic?.trackName}</title>
            </Head>
            <MainBody title="Playing">
                <div className={styles.playing}>
                    <h1>{selectedMusic?.trackName}</h1>
                    <p>{selectedMusic?.artist}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={selectedMusic?.picture?.[1] || defaultImage.src}
                        alt={selectedMusic?.trackName}
                    />
                </div>
            </MainBody>
        </>
    );
}
