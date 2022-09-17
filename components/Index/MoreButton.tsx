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
    const { setNext, value: selectedMusic } = useSelectMusic();
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
                    disabled={song?.id === selectedMusic?.id}
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
                        router.push(`/info/song?musicId=${song?.id}`);
                    }}>
                    Music Details
                </MenuItem>
                <MenuItem
                    onClick={e => {
                        e.stopPropagation();
                        setAnchorEl(null);
                        router.push({
                            pathname: "/lyrics",
                            query: {
                                song: song?.trackName ?? "",
                                artist: song?.artist ?? "",
                                id: song?.id ?? "",
                                lyrics: song?.lyrics ?? "",
                            },
                        });
                    }}>
                    Lyrics
                </MenuItem>
                <MenuItem
                    onClick={e => {
                        e.stopPropagation();
                        setAnchorEl(null);
                        router.push(`/playlist/artist?name=${song.artist}`);
                    }}>
                    Go to Artist
                </MenuItem>
                <MenuItem
                    onClick={e => {
                        e.stopPropagation();
                        setAnchorEl(null);
                        router.push(`/playlist/album?name=${song.album}`);
                    }}>
                    Go to Album
                </MenuItem>
                <MenuItem
                    onClick={e => {
                        e.stopPropagation();
                        setAnchorEl(null);
                        router.push(`/playlist/genre?name=${song.genre}`);
                    }}>
                    Go to Genre
                </MenuItem>
            </Menu>
        </>
    );
}
