import Head from "next/head";
import MainBody from "@components/MainBody";
import styles from "@styles/Home.module.scss";
import defaultImage from "@assets/disk.png";
import { useSelectMusic } from "@contexts/SelectMusic";
import { GiMusicalScore } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import MoreButton from "@components/Index/MoreButton";
import Image from "next/image";

export default function Playing() {
    const selectedMusic = useSelectMusic().value;
    const router = useRouter();

    const buttons = [
        {
            name: "Music Details",
            icon: <BsInfoCircle size="1.3rem" />,
            cb: () => {
                router.push(`/info/song?musicId=${selectedMusic.id}`);
            },
        },
        {
            name: "Lyrics",
            icon: <GiMusicalScore size="1.3rem" />,
            cb: () => {
                router.push({
                    pathname: "/lyrics",
                    query: {
                        song: selectedMusic.trackName ?? "",
                        artist: selectedMusic.artist ?? "",
                        id: selectedMusic.id ?? "",
                        lyrics: selectedMusic.lyrics ?? "",
                    },
                });
            },
        },
        {
            name: "Go to Artist",
            icon: <FiExternalLink size="1.3rem" />,
            cb: () => {
                router.push(`/playlist/artist?name=${selectedMusic.artist}`);
            },
        },
        {
            name: "Go to Album",
            icon: <FiExternalLink size="1.3rem" />,
            cb: () => {
                router.push(`/playlist/album?name=${selectedMusic.album}`);
            },
        },
        {
            name: "Go to Genre",
            icon: <FiExternalLink size="1.3rem" />,
            cb: () => {
                router.push(`/playlist/genre?name=${selectedMusic.genre}`);
            },
        },
    ];

    return (
        <>
            <Head>
                <title>Playing - {selectedMusic?.trackName ? selectedMusic.trackName : ""}</title>
            </Head>
            <MainBody title="Playing">
                <div className={styles.playing}>
                    <h1>
                        {selectedMusic?.trackName}
                        <span
                            style={{
                                position: "absolute",
                                right: "0%",
                            }}
                        >
                            <MoreButton buttons={buttons} />
                        </span>
                    </h1>
                    <p>{selectedMusic?.artist}</p>
                    <Image
                        src={
                            selectedMusic?.thumbnail?.["original"] ||
                            defaultImage.src
                        }
                        width={100}
                        height={100}
                        alt={selectedMusic?.trackName}
                    />
                </div>
            </MainBody>
        </>
    );
}
