import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";

export default function MyIconButton({ children, ...rest }: IconButtonProps) {
    return (
        <IconButton
            centerRipple={false}
            sx={{
                "&.MuiIconButton-root:hover": {
                    background: "none",
                },
                ".MuiTouchRipple-child": {
                    backgroundColor: `white`,
                },
            }}
            {...rest}
            className="ripple"
        >
            {children}
        </IconButton>
    );
}
