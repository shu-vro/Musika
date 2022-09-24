import { useEffect, useRef, useState } from "react";
import { IoRepeat, IoShuffle } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import styles from "@styles/ControlPanel.module.scss";
import { useSelectMusic } from "@contexts/SelectMusic";
import { useLoading } from "@contexts/Loading";
import TimeControlSection from "./TimeControlSection";
import VolumeSection from "./VolumeSection";
import MyTooltip from "@components/Index/MyTooltip";

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
    const [activateRange, setActivateRange] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const { setValue: setLoading } = useLoading();

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
                if ("mediaSession" in navigator) {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: selectedMusic?.trackName,
                        artist: selectedMusic?.artist,
                        album: selectedMusic?.album,
                        artwork: [
                            {
                                src: selectedMusic?.picture?.[0],
                            },
                        ],
                    });
                }
                setPaused(false);
            } catch (e) {}
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMusic?.src || shuffle]);

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
                    onPlay={e => {
                        setPaused((e.target as HTMLAudioElement).paused);
                    }}
                    onPause={e => {
                        setPaused((e.target as HTMLAudioElement).paused);
                    }}
                />
                <div className={styles["control-buttons"]}>
                    <MyTooltip title="Repeat" className="ripple">
                        <button
                            className={`repeat ${styles.button} ${
                                loop ? styles.active : ""
                            }`}
                            onClick={() => {
                                audioRef.current.loop = !audioRef.current?.loop;
                                setLoop(audioRef.current?.loop);
                            }}
                        >
                            <IoRepeat size="2rem" />
                        </button>
                    </MyTooltip>
                    <MyTooltip title="Play Previous" className="ripple">
                        <button
                            className={`prev ${styles.button}`}
                            onClick={playPrevious}
                        >
                            <MdSkipPrevious size="2rem" />
                        </button>
                    </MyTooltip>
                    <MyTooltip title="Play/Pause" className="ripple">
                        <button
                            className={`play-pause ${styles.button}`}
                            style={{ padding: "10px" }}
                            onClick={async () => {
                                try {
                                    audioRef.current.paused
                                        ? await audioRef.current.play()
                                        : audioRef.current.pause();
                                } catch (e) {}
                            }}
                        >
                            {paused ? (
                                <FaPlay size="2.0rem" />
                            ) : (
                                <IoMdPause size="2.0rem" />
                            )}
                        </button>
                    </MyTooltip>
                    <MyTooltip title="Play Next" className="ripple">
                        <button
                            className={`next ${styles.button}`}
                            onClick={playNext}
                        >
                            <MdSkipNext size="2rem" />
                        </button>
                    </MyTooltip>
                    <MyTooltip title="Shuffle" className="ripple">
                        <button
                            className={`shuffle ${styles.button}`}
                            onClick={shuffle}
                        >
                            <IoShuffle size="2rem" />
                        </button>
                    </MyTooltip>
                </div>
                <TimeControlSection
                    audioRef={audioRef}
                    currentTime={currentTime}
                    duration={selectedMusic?.duration}
                    activateRange={activateRange}
                />
            </div>
            <VolumeSection
                volume={volume}
                setVolume={setVolume}
                setActivateRange={setActivateRange}
            />
        </>
    );
}
