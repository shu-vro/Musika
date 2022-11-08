import { useEffect } from "react";
import MainBody from "@components/MainBody";
import defaultImage from "../../assets/photo.jpg";
import styles from "@styles/Songs.module.scss";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import Head from "next/head";
import Image from "next/image";
import ytsr from "ytsr";
import { IArrayAudioMetaData, IAudioMetadata } from "@ts/types";
import numeral from "numeral";
import StoreSongList from "@components/Store/StoreSongList";
import { useMusicStore } from "@contexts/MusicStore";

export async function getStaticProps() {
    let searchResults = [];
    try {
        let searched = await ytsr("new music", {
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
                        path: item.url,
                        lyrics: "",
                        format: "audio/mp3",
                        size: 10000,
                        src: "",
                        album: "youtube",
                        genre: "unknown",
                        downloaded: false,
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

interface IStoreAudioMetadata extends IAudioMetadata {
    downloaded: boolean;
}

export default function PlayList({ data }: { data: IStoreAudioMetadata[] }) {
    const rippleRefresh = useRippleRefresh();
    const { value: musicStore } = useMusicStore();

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
                    {data
                        .filter(
                            // exclude downloaded
                            e =>
                                musicStore.findIndex(e2 => e2.id === e.id) ===
                                -1
                        )
                        .map(song => (
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
