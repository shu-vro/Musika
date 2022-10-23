import { useEffect, useState } from "react";
import { normalizeTimeFormat } from "@utils/utils";
import RangeSlider from "./RangeSlider";
import RangeSliderMulti from "./RangeSliderMulti";
import styles from "@styles/ControlPanel.module.scss";

export default function TimeControlSection({
    currentTime = 0,
    duration = 0,
    audioRef,
    activateRange,
}) {
    const [value, setValue] = useState<[number, number, number]>([
        0,
        duration / 2,
        duration,
    ]);

    useEffect(() => {
        if (!activateRange) return;
        if (value[1] > value[2]) {
            if (!audioRef.current) return;
            audioRef.current.currentTime = value[0];
            setValue(prev => [prev[0], prev[0], prev[2]]);
        } else {
            setValue(prev => [prev[0], currentTime, prev[2]]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime]);

    useEffect(() => {
        if (!activateRange) return;
        setValue([0, currentTime, duration]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activateRange]);

    return (
        <div className={styles.ladder}>
            <span>{normalizeTimeFormat(currentTime)}</span>
            {activateRange ? (
                <RangeSliderMulti
                    value={value}
                    min={0}
                    max={duration || 0}
                    valueLabelDisplay="auto"
                    valueLabelFormat={a => {
                        return normalizeTimeFormat(a);
                    }}
                    onChange={(_e, n, _a) => {
                        audioRef.current.currentTime = Number(n[1]);
                        setValue([n[0], audioRef.current.currentTime, n[2]]);
                    }}
                />
            ) : (
                <RangeSlider
                    min={0}
                    max={duration || 0}
                    value={currentTime}
                    onChange={(_e, n, _a) => {
                        audioRef.current.currentTime = Number(n);
                    }}
                />
            )}
            <span>{normalizeTimeFormat(duration || 0)}</span>
        </div>
    );
}
