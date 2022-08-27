import Head from "next/head";
import Image from "next/image";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import defaultImage from "@assets/disk.png";
import { useSelectMusic } from "@contexts/SelectMusic";
import { useEffect, useRef, useState } from "react";

export default function Playing() {
    const selectedMusic = useSelectMusic().value;
    const imageParentRef = useRef(null);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        function setWidth() {
            let image = imageParentRef.current.querySelector("img");
            try {
                setTimeout(() => {
                    let { y } = image.getBoundingClientRect();
                    let targetElHeight =
                        image.parentElement.parentElement.parentElement
                            .offsetHeight;
                    setHeight(targetElHeight - y);
                }, 500);
            } catch (e) {}
        }
        setWidth();
        window.addEventListener("resize", setWidth);
    }, []);

    return (
        <>
            <Head>
                <title>Playing - </title>
            </Head>
            <MainBody title="Playing">
                <div className={styles.playing} ref={imageParentRef}>
                    <h1>{selectedMusic?.trackName}</h1>
                    <p>{selectedMusic?.artist}</p>
                    <Image
                        src={defaultImage}
                        alt={selectedMusic?.trackName}
                        layout="fixed"
                        objectFit="contain"
                        height={height}
                        width={height}
                        style={{
                            opacity: height === 0 ? 0 : 1,
                        }}
                    />
                </div>
            </MainBody>
        </>
    );
}
