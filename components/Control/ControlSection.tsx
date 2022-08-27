import { IoRepeat, IoShuffle } from "react-icons/io5";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import styles from "@styles/ControlPanel.module.scss";
import { normalizeTimeFormat } from "@utils/utils";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";

export default function ControlSection() {
    const [ladder, setLadder] = useState(1);
    return (
        <div className={`${styles["control-section"]}`}>
            <audio src="" hidden autoPlay />
            <div className={styles["control-buttons"]}>
                <button
                    className={`ripple repeat ${styles.button}`}
                    // className="{ active: audioLoop }"
                >
                    <IoRepeat size="2rem" />
                </button>
                <button className={`ripple prev ${styles.button}`}>
                    <MdSkipPrevious size="2rem" />
                </button>
                <button
                    className={`ripple play-pause ${styles.button}`}
                    style={{ padding: "10px" }}>
                    <FaPlay size="2.5rem" />
                </button>
                <button className={`ripple next ${styles.button}`}>
                    <MdSkipNext size="2rem" />
                </button>
                <button className={`ripple shuffle ${styles.button}`}>
                    <IoShuffle size="2rem" />
                </button>
            </div>
            <div className={styles.ladder}>
                <span>{normalizeTimeFormat(0)}</span>
                <input
                    type="range"
                    className={styles.progress}
                    value={ladder}
                    min="0"
                    max={10}
                    onInput={e =>
                        setLadder(Number((e.target as HTMLInputElement).value))
                    }
                />
                <span>{normalizeTimeFormat(300)}</span>
            </div>
        </div>
    );
}
