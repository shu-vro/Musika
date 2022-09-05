import React from "react";
import styles from "@styles/ControlPanel.module.scss";
import { GiMusicalScore } from "react-icons/gi";
import { FiVolume2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { useVolumeHandle } from "@contexts/VolumeHandle";
import { useSelectMusic } from "@contexts/SelectMusic";
import RangeSlider from "./RangeSlider";

export default function VolumeSection() {
    const router = useRouter();
    const selectedMusic = useSelectMusic().value;
    const { value: volume, setValue: setVolume } = useVolumeHandle();
    function navigate() {
        console.log(router);
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
            <div className={styles["volume-section"]}>
                <button>
                    <GiMusicalScore size="1.5rem" onClick={navigate} />
                </button>
                <button className={styles.volume}>
                    <FiVolume2 size="1.5rem" />
                    {/* <input
                        type="range"
                        className={styles.progress}
                        min="0"
                        max="100"
                        value={volume}
                        onChange={e => setVolume(Number(e.target.value))}
                    /> */}
                    <RangeSlider
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e, n, a) => setVolume(Number(n))}
                    />
                </button>
            </div>
        </>
    );
}
