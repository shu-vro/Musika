import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { IArrayMoreButtons } from "@ts/types";

export default function MoreControlButton({
    buttons = [],
}: {
    buttons: IArrayMoreButtons;
}) {
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
            <Tooltip title="See more">
                <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <BiDotsVerticalRounded
                        size="2rem"
                        style={{
                            zIndex: 1,
                            color: "var(--color)",
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{
                    "& .MuiPaper-root": {
                        background: `rgba(255, 255, 255, 0.151)`,
                        backdropFilter: `blur(10px)`,
                    },
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {buttons.map(button => (
                    <MenuItem
                        key={button.name}
                        onClick={e => {
                            e.stopPropagation();
                            setAnchorEl(null);
                            button.cb();
                        }}
                        {...button?.rest}
                    >
                        <ListItemIcon>{button.icon}</ListItemIcon>
                        <ListItemText>{button.name}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
