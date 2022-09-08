import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { useSelectMusic } from "@contexts/SelectMusic";
import { IAudioMetadata } from "@ts/types";
import { useRouter } from "next/router";

export default function MoreButton({ song }: { song: IAudioMetadata }) {
    const router = useRouter();
    const { setNext } = useSelectMusic();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };
    const handleClose = e => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}>
                <BiDotsVerticalRounded
                    size="2rem"
                    style={{
                        zIndex: 1,
                        color: "var(--color)",
                    }}
                />
            </IconButton>
            <Menu
                id="basic-menu"
                sx={{
                    "& .MuiPaper-root": {
                        color: `var(--color)`,
                        background: `rgba(255, 255, 255, 0.151)`,
                        backdropFilter: `blur(10px)`,
                    },
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}>
                <MenuItem
                    onClick={e => {
                        e.stopPropagation();
                        setAnchorEl(null);
                        setNext(song);
                    }}>
                    Play Next
                </MenuItem>
                <MenuItem
                    onClick={e => {
                        e.stopPropagation();
                        setAnchorEl(null);
                        router.push(
                            `/info/${song?.trackName || `song`}?musicId=${
                                song?.id
                            }`
                        );
                    }}>
                    Info
                </MenuItem>
                <MenuItem onClick={handleClose}>Go to Artist</MenuItem>
                <MenuItem onClick={handleClose}>Go to Genre</MenuItem>
            </Menu>
        </>
    );
}
