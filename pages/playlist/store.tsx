import { useEffect, useState } from "react";
import MainBody from "@components/MainBody";
import defaultImage from "../../assets/photo.jpg";
import styles from "@styles/Songs.module.scss";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import Head from "next/head";
import Image from "next/image";
import { BsInfoCircle, BsCloudDownload } from "react-icons/bs";
import { useRouter } from "next/router";
import { normalizeTimeFormat } from "@utils/utils";
import MoreButton from "@components/Index/MoreButton";
import { GiMusicalScore } from "react-icons/gi";
import { IconButton } from "@mui/material";
import ytsr from "ytsr";
import { IAudioMetadata } from "@ts/types";
import numeral from "numeral";
import axios from "axios";
import { _arrayBufferToBase64 } from "@utils/utils";
import { useMusicStore } from "@contexts/MusicStore";

export async function getStaticProps() {
    let searchResults = [];
    try {
        let searched = await ytsr("music", {
            limit: 100,
        });
        const uniqueIds = new Set();
        searchResults = searched.items
            .filter(item => {
                if (item.type === "video") {
                    const isDuplicate = uniqueIds.has(item.id);
                    uniqueIds.add(item.id);
                    return (
                        item.duration &&
                        numeral(item.duration).value()! < 600 &&
                        !item.isLive &&
                        !isDuplicate
                    );
                }
            })
            .map(item => {
                if (item.type === "video") {
                    return {
                        id: item.id,
                        trackName: item.title,
                        artist: item.author.name,
                        thumbnail: {
                            "92x92": item.thumbnails[1]?.url
                                ? item.thumbnails[1].url
                                : item.thumbnails[0]?.url,
                            original: item.bestThumbnail?.url,
                        },
                        duration: numeral(item.duration).value(),
                        loved: false,
                        path: "youtube",
                        lyrics: "",
                        format: "audio/mp3",
                        size: 10000,
                        src: "",
                        album: "unknown",
                        genre: "unknown",
                    } as IAudioMetadata;
                }
            });
    } catch (e) {
        console.log(e);
    }
    return {
        props: {
            data: searchResults,
        },
        revalidate: 86400, // In seconds -> 1 day
    };
}

export default function PlayList({ data }) {
    const rippleRefresh = useRippleRefresh();

    useEffect(() => {
        rippleRefresh.refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Head>
                <title>Online Store - MUSIKA</title>
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
                                        data?.[i]?.thumbnail?.["original"] ||
                                        defaultImage
                                    }
                                    alt="playlist"
                                    width={800}
                                    height={800}
                                    key={i}
                                />
                            ))}
                        <div>
                            <p>playlist</p>
                            <h1>Online Store</h1>
                        </div>
                    </div>
                    {data.map(song => (
                        <StoreSongList
                            key={song.id}
                            song={song}
                            cb={() => {}}
                        />
                    ))}
                </div>
            </MainBody>
        </>
    );
}

export function StoreSongList({ song, cb = () => null, ...rest }) {
    const router = useRouter();
    const { setValue: setMusicStore } = useMusicStore();

    const buttons = [
        {
            name: "Music Details",
            icon: <BsInfoCircle size="1.3rem" />,
            cb: () => {
                router.push(`/info/song?musicId=${song?.id}`);
            },
        },
        {
            name: "Lyrics",
            icon: <GiMusicalScore size="1.3rem" />,
            cb: () => {
                router.push({
                    pathname: "/lyrics",
                    query: {
                        song: song?.trackName ?? "",
                        artist: "",
                        id: song?.id ?? "",
                        lyrics: song?.lyrics ?? "",
                    },
                });
            },
        },
    ];
    return (
        <div
            className={`ripple ${styles.song}`}
            key={song.id}
            onClick={() => {
                cb();
            }}
            {...rest}
        >
            <div>
                <Image
                    src={song.thumbnail?.["92x92"] || defaultImage}
                    alt={song.trackName}
                    width={70}
                    height={70}
                />
                <div className={styles["song-title"]}>{song.trackName}</div>
            </div>
            <i className={styles["song-artist"]}>{song.artist}</i>
            <b>{normalizeTimeFormat(song.duration)}</b>
            <IconButton
                sx={{ ml: 2 }}
                onClick={async () => {
                    try {
                        const res = await axios.get(
                            `/api/loadSongs?id=${song.id}`,
                            { responseType: "arraybuffer" }
                        );
                        const src = _arrayBufferToBase64(
                            res.data,
                            "audio/mpeg"
                        );
                        let newSong = { ...song, src };
                        setMusicStore(prev => {
                            let idExists = prev.findIndex(
                                e => e.id === song.id
                            );
                            console.log(idExists, newSong);
                            if (idExists !== -1) {
                                return prev;
                            }
                            return [...prev, newSong];
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }}
            >
                <BsCloudDownload size="2rem" />
            </IconButton>
            <MoreButton buttons={buttons} />
        </div>
    );
}
