import { Tooltip, TooltipProps } from "@mui/material";
import React from "react";

export default function MyTooltip({
    children,
    title = "hover me",
    ...rest
}: TooltipProps) {
    return (
        <Tooltip
            title={title}
            placement="top"
            arrow
            enterDelay={1000}
            {...rest}
        >
            {children}
        </Tooltip>
    );
}
