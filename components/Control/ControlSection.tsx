import { useEffect, useRef, useState } from "react";
import { IoRepeat, IoShuffle } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { GiMusicalScore } from "react-icons/gi";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useRouter } from "next/router";
import styles from "@styles/ControlPanel.module.scss";
import { normalizeTimeFormat } from "@utils/utils";
import { useSelectMusic } from "@contexts/SelectMusic";
import RangeSlider from "./RangeSlider";
import { useLoading } from "@contexts/Loading";
import { IconButton } from "@mui/material";

export default function ControlSection() {
    const {
        value: selectedMusic,
        playNext,
        playPrevious,
        shuffle,
    } = useSelectMusic();
    const [volume, setVolume] = useState(100);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [loop, setLoop] = useState(false);
    const [paused, setPaused] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const { setValue: setLoading } = useLoading();
    const router = useRouter();

    useEffect(() => {
        let audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(Math.floor(audioRef.current?.currentTime || 0));
        }, 1000);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (selectedMusic === null) return;
                await audioRef.current?.play();
                setPaused(false);
            } catch (e) {}
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMusic?.src || shuffle]);

    function navigate() {
        if (router.pathname === "/lyrics") {
            return router.back();
        }
        router.push({
            pathname: "/lyrics",
            query: {
                song: selectedMusic?.trackName ?? "",
                artist: selectedMusic?.artist ?? "",
                id: selectedMusic?.id ?? "",
                lyrics: selectedMusic?.lyrics ?? "",
            },
        });
    }

    return (
        <>
            <div className={`${styles["control-section"]}`}>
                <audio
                    src={(selectedMusic?.src as string) || ""}
                    hidden
                    ref={audioRef}
                    onLoadStart={() => {
                        setLoading(true);
                    }}
                    onLoadedData={() => {
                        setLoading(false);
                    }}
                    onError={() => {
                        setLoading(false);
                    }}
                />
                <div className={styles["control-buttons"]}>
                    <button
                        className={`ripple repeat ${styles.button} ${
                            loop ? styles.active : ""
                        }`}
                        onClick={() => {
                            audioRef.current.loop = !audioRef.current?.loop;
                            setLoop(audioRef.current?.loop);
                        }}>
                        <IoRepeat size="2rem" />
                    </button>
                    <button
                        className={`ripple prev ${styles.button}`}
                        onClick={playPrevious}>
                        <MdSkipPrevious size="2rem" />
                    </button>
                    <button
                        className={`ripple play-pause ${styles.button}`}
                        style={{ padding: "10px" }}
                        onClick={async () => {
                            try {
                                audioRef.current.paused
                                    ? await audioRef.current.play()
                                    : audioRef.current.pause();
                                setPaused(audioRef.current.paused);
                            } catch (e) {}
                        }}>
                        {paused ? (
                            <FaPlay size="2.0rem" />
                        ) : (
                            <IoMdPause size="2.0rem" />
                        )}
                    </button>
                    <button
                        className={`ripple next ${styles.button}`}
                        onClick={playNext}>
                        <MdSkipNext size="2rem" />
                    </button>
                    <button
                        className={`ripple shuffle ${styles.button}`}
                        onClick={shuffle}>
                        <IoShuffle size="2rem" />
                    </button>
                </div>
                <div className={styles.ladder}>
                    <span>{normalizeTimeFormat(currentTime)}</span>
                    <RangeSlider
                        min={0}
                        max={selectedMusic?.duration || 0}
                        value={currentTime}
                        onChange={(e, n, a) => {
                            audioRef.current.currentTime = Number(n);
                        }}
                    />
                    <span>
                        {normalizeTimeFormat(selectedMusic?.duration || 0)}
                    </span>
                </div>
            </div>
            <div className={styles["volume-section"]}>
                <IconButton onClick={navigate}>
                    <GiMusicalScore size="1.5rem" />
                </IconButton>
                <div className={styles.volume}>
                    <IconButton
                        onClick={() => {
                            setVolume(prev => (prev !== 0 ? 0 : 100));
                        }}>
                        {volume === 0 ? (
                            <FiVolumeX size="1.5rem" />
                        ) : (
                            <FiVolume2 size="1.5rem" />
                        )}
                    </IconButton>
                    <RangeSlider
                        min={0}
                        max={100}
                        value={volume}
                        valueLabelDisplay="auto"
                        onChange={(e, n, a) => setVolume(Number(n))}
                    />
                </div>
            </div>
        </>
    );
}
