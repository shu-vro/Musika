import * as React from "react";
import Slider from "@mui/material/Slider";
import { SliderUnstyledOwnProps } from "@mui/base";
import { styled } from "@mui/material/styles";

function valuetext(value: number) {
    return `${value} seconds`;
}

const MySlider = styled(Slider)({
    color: "#52af77",
    height: 8,
    "& .MuiSlider-track": {
        border: "none",
        backgroundColor: "var(--theme)",
    },
    "& .MuiSlider-rail": {
        opacity: 0.4,
        height: 5,
        backgroundColor: "var(--color)",
    },
    "& .MuiSlider-thumb": {
        backgroundColor: "#00ffb8",
    },
    "& .MuiSlider-thumb:nth-child(odd)": {
        backgroundColor: "#fff",
    },
}) as typeof Slider;

const minDistance = 2;

export default function RangeSliderMulti({
    value,
    onChange,
    ...rest
}: SliderUnstyledOwnProps) {
    // const onChange = (
    //     event: Event,
    //     newValue: number | number[],
    //     activeThumb: number
    // ) => {
    //     if (!Array.isArray(newValue)) {
    //         setValue(newValue);
    //         return;
    //     }
    //     if (newValue[2] - newValue[0] < minDistance) {
    //         if (activeThumb === 0) {
    //             const clamped = Math.min(newValue[0], 100 - minDistance);
    //             setValue([clamped, clamped + minDistance]);
    //         } else {
    //             const clamped = Math.max(newValue[2], minDistance);
    //             setValue([clamped - minDistance, clamped]);
    //         }
    //     } else {
    //         setValue(newValue as number[]);
    //     }
    // };

    return (
        <MySlider
            getAriaLabel={() => "Track of playing music"}
            value={value}
            onChange={onChange}
            getAriaValueText={valuetext}
            disableSwap
            {...rest}
        />
    );
}
