import React from "react";
import styles from "@styles/ControlPanel.module.scss";
import { GiMusicalScore } from "react-icons/gi";
import { FiVolume2 } from "react-icons/fi";

export default function VolumeSection() {
    return (
        <>
            <div className={styles["volume-section"]}>
                <button>
                    <GiMusicalScore size="1.5rem" />
                </button>
                <button className={styles.volume}>
                    <FiVolume2 size="1.5rem" />
                    <input
                        type="range"
                        className={styles.progress}
                        min="0"
                        max="100"
                        v-model="useVolumeStore().volume"
                    />
                </button>
            </div>
        </>
    );
}
