import React from "react";
import { GiMusicalScore } from "react-icons/gi";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { IconButton } from "@mui/material";
import RangeSlider from "./RangeSlider";
import styles from "@styles/ControlPanel.module.scss";
import { useRouter } from "next/router";
import { useSelectMusic } from "@contexts/SelectMusic";

export default function VolumeSection({ volume, setVolume }) {
    const router = useRouter();
    const { value: selectedMusic } = useSelectMusic();

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
    );
}
