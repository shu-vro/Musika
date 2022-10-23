import { useEffect, useRef, useState } from "react";
import { IoRepeat, IoShuffle } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IconButton } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import styles from "@styles/ControlPanel.module.scss";
import { useSelectMusic } from "@contexts/SelectMusic";
import { useLoading } from "@contexts/Loading";
import TimeControlSection from "./TimeControlSection";
import VolumeSection from "./VolumeSection";
import { useMusicStore } from "@contexts/MusicStore";

export default function ControlSection() {
    const {
        value: selectedMusic,
        playNext,
        playPrevious,
        shuffle,
        setValue: setSelectedMusic,
    } = useSelectMusic();
    const [volume, setVolume] = useState(100);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [loop, setLoop] = useState(false);
    const [paused, setPaused] = useState(true);
    const [activateRange, setActivateRange] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const { setValue: setLoading } = useLoading();
    const { setUsingId } = useMusicStore();

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
                                src: selectedMusic?.picture?.["92x92"],
                            },
                        ],
                    });
                }
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
                    onDurationChange={e => {
                        let aud = e.target as HTMLAudioElement;
                        if (
                            aud.duration !== selectedMusic?.duration &&
                            (selectedMusic?.duration === Infinity ||
                                selectedMusic?.duration === 0)
                        ) {
                            setUsingId(selectedMusic?.id, {
                                duration: aud.duration,
                            });
                            setSelectedMusic(prev => {
                                let temp = { ...prev };
                                temp.duration = aud.duration;
                                return temp;
                            });
                        }
                    }}
                />
                <div className={styles["control-buttons"]}>
                    <Tooltip title="Repeat">
                        <IconButton
                            className={`repeat ${styles.button} ${
                                loop ? styles.active : ""
                            }`}
                            onClick={() => {
                                audioRef.current.loop = !audioRef.current?.loop;
                                setLoop(audioRef.current?.loop);
                            }}
                        >
                            <IoRepeat size="2rem" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Play Previous">
                        <IconButton
                            className={`prev ${styles.button}`}
                            onClick={() => {
                                if (audioRef.current?.currentTime > 10) {
                                    audioRef.current.currentTime = 0;
                                } else {
                                    playPrevious();
                                }
                            }}
                        >
                            <MdSkipPrevious size="2rem" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Play/Pause">
                        <IconButton
                            className="play-pause"
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
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Play Next">
                        <IconButton className="next" onClick={playNext}>
                            <MdSkipNext size="2rem" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Shuffle">
                        <IconButton className="shuffle" onClick={shuffle}>
                            <IoShuffle size="2rem" />
                        </IconButton>
                    </Tooltip>
                </div>
                <TimeControlSection
                    audioRef={audioRef}
                    currentTime={currentTime}
                    duration={
                        selectedMusic?.duration !== Infinity
                            ? selectedMusic?.duration
                            : audioRef.current?.duration
                    }
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
