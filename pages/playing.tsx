import MainBody from "@components/MainBody";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.scss";
import defaultImage from "@assets/disk.png";

export default function Playing() {
    return (
        <>
            <Head>
                <title>Playing - </title>
            </Head>
            <MainBody title="Playing">
                <div className={styles.playing}>
                    <h1>Some name</h1>
                    <p>Some artist</p>
                    <Image
                        is="imageHeight !== 0"
                        // :height="imageHeight"
                        src={defaultImage}
                        alt={""}
                        height="100px"
                        width="100px"
                    />
                </div>
            </MainBody>
        </>
    );
}
