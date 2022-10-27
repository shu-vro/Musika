import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IAudioMetadata } from "@ts/types";
import { useMusicStore } from "@contexts/MusicStore";

interface ConfirmDeleteProps extends React.HTMLAttributes<HTMLDivElement> {
    song: IAudioMetadata;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmDelete({
    song,
    open,
    setOpen,
}: ConfirmDeleteProps) {
    const { deleteTrack } = useMusicStore();
    const handleClose = e => {
        e.stopPropagation();
        setOpen(false);
    };

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                sx={{
                    "& .MuiPaper-root ": {
                        background: `rgba(255, 255, 255, .3)`,
                        backdropFilter: `blur(5px)`,
                    },
                }}
            >
                <DialogTitle>
                    Confirm To <span style={{ color: "red" }}>Delete?</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete {song.trackName} Permanently?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={e => {
                            e.stopPropagation();
                            deleteTrack(song, true);
                            handleClose(e);
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={e => {
                            e.stopPropagation();
                            handleClose(e);
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
