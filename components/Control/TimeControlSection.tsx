import { CgArrowsShrinkH } from "react-icons/cg";
import { useEffect, useState } from "react";
import { normalizeTimeFormat } from "@utils/utils";
import RangeSlider from "./RangeSlider";
import RangeSliderMulti from "./RangeSliderMulti";
import styles from "@styles/ControlPanel.module.scss";

export default function TimeControlSection({
    currentTime,
    duration = 0,
    audioRef,
}) {
    const [activate, setActivate] = useState(false);
    const [value, setValue] = useState([0, duration / 2, duration]);
    const minDistance = duration > 10 ? 10 : 1;

    useEffect(() => {
        setValue(prev => [prev[0], currentTime, prev[2]]);
    }, [currentTime]);

    return (
        <div className={styles.ladder}>
            <span>{normalizeTimeFormat(currentTime)}</span>
            {activate ? (
                <RangeSliderMulti
                    value={value}
                    min={0}
                    max={duration || 0}
                    onChange={(e, n, a) => {
                        audioRef.current.currentTime = Number(n[1]);
                        setValue([n[0], audioRef.current.currentTime, n[2]]);
                    }}
                />
            ) : (
                <RangeSlider
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e, n, a) => {
                        audioRef.current.currentTime = Number(n);
                    }}
                />
            )}
            <span>{normalizeTimeFormat(duration || 0)}</span>
            <CgArrowsShrinkH
                size={"2rem"}
                onClick={() => {
                    setActivate(!activate);
                }}
            />
        </div>
    );
}
