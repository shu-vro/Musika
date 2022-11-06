import { BsInfoCircle, BsCloudDownload } from "react-icons/bs";
import { useRouter } from "next/router";
import { normalizeTimeFormat } from "@utils/utils";
import MoreButton from "@components/Index/MoreButton";
import { GiMusicalScore } from "react-icons/gi";
import { CircularProgress, IconButton } from "@mui/material";
import axios from "axios";
import { useMusicStore } from "@contexts/MusicStore";
import styles from "@styles/Songs.module.scss";
import Image from "next/image";
import defaultImage from "../../assets/photo.jpg";
import { _arrayBufferToBase64 } from "@utils/utils";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { IAudioMetadata } from "@ts/types";

export default function StoreSongList({ song, cb = () => null, ...rest }) {
    const router = useRouter();
    const { value: musicStore, setValue: setMusicStore } = useMusicStore();
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (downloading) {
            let interval = setInterval(() => {
                setDownloadProgress(prev => prev + 5);
            }, 500);
            if (downloadProgress >= 90) {
                clearInterval(interval);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downloading]);

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
                        artist: song?.artist ?? "",
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
            {downloading ? (
                <CircularProgress
                    variant="determinate"
                    value={downloadProgress}
                    aria-describedby="downloading music"
                    aria-busy={true}
                    size={30}
                    sx={{
                        ml: 2,
                        color: `currentColor`,
                    }}
                />
            ) : (
                <IconButton
                    sx={{ ml: 2 }}
                    onClick={async () => {
                        try {
                            let idExists = musicStore.findIndex(
                                e => e.id === song.id
                            );
                            if (idExists !== -1) {
                                return;
                            }
                            setDownloading(true);
                            const res = await axios.get(
                                `/api/loadSongs?id=${song.id}`,
                                { responseType: "arraybuffer" }
                            );
                            const src = _arrayBufferToBase64(
                                res.data,
                                "audio/mpeg"
                            );
                            let newSong: IAudioMetadata = {
                                ...song,
                                src,
                                downloaded: true,
                                size: src.length,
                            };
                            setMusicStore(prev => {
                                return [...prev, newSong];
                            });
                            setDownloading(false);
                            enqueueSnackbar(
                                `${newSong.trackName} Downloaded Successfully!`,
                                {
                                    variant: "success",
                                }
                            );
                        } catch (e) {
                            console.log(e);
                            setDownloading(false);
                            enqueueSnackbar(
                                `There was a problem while downloading ${song.trackName}`,
                                {
                                    variant: "error",
                                }
                            );
                        }
                    }}
                >
                    <BsCloudDownload size="2rem" />
                </IconButton>
            )}
            <MoreButton buttons={buttons} />
        </div>
    );
}
