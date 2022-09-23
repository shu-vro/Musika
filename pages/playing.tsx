import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import defaultImage from "@assets/disk.png";
import { useSelectMusic } from "@contexts/SelectMusic";

export default function Playing() {
    const selectedMusic = useSelectMusic().value;
    const imageParentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        function setWidth() {
            if (!imageParentRef.current) return;
            try {
                let image = imageParentRef.current.querySelector("img");
                setTimeout(() => {
                    let { y } = image.getBoundingClientRect();
                    let targetElHeight =
                        image.parentElement.parentElement.offsetHeight;
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
                <title>Playing - {selectedMusic?.trackName}</title>
            </Head>
            <MainBody title="Playing">
                <div className={styles.playing} ref={imageParentRef}>
                    <h1>{selectedMusic?.trackName}</h1>
                    <p>{selectedMusic?.artist}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={selectedMusic?.picture || defaultImage.src}
                        alt={selectedMusic?.trackName}
                        height={height}
                        style={{
                            opacity: height === 0 ? 0 : 1,
                        }}
                    />
                </div>
            </MainBody>
        </>
    );
}
