import { TextField, IconButton, Dialog } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DialogTitle from "@mui/material/DialogTitle";
import SongList from "./Index/SongList";
import { useMusicStore } from "@contexts/MusicStore";
import SongsStyles from "@styles/Songs.module.scss";
import { useState } from "react";
import { ISearchFromValues } from "@ts/types";

export default function AlertDialog({ open, setOpen }) {
    const [searchValues, setSearchValues] = useState<ISearchFromValues[][]>([
        [],
    ]);
    const handleClose = () => {
        setOpen(false);
    };
    const { setQueue, SearchFromValues } = useMusicStore();
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
                sx={{
                    "& .MuiPaper-root": {
                        background: `rgba(255, 255, 255, .4)`,
                        backdropFilter: `blur(5px)`,
                        borderRadius: `10px`,
                        color: `var(--color) !important`,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Search Music
                    <IconButton onClick={handleClose} autoFocus>
                        <IoIosCloseCircleOutline size="2rem" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        label="Search By Anything"
                        variant="outlined"
                        fullWidth={true}
                        onInput={e => {
                            let value = (e.target as HTMLInputElement).value;
                            setSearchValues(SearchFromValues(value));
                        }}
                        sx={{
                            "& label.Mui-focused": {
                                color: "var(--color)",
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: "var(--color)",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white",
                                },
                                "&:hover fieldset": {
                                    borderColor: "var(--color)",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "var(--color)",
                                },
                            },
                        }}
                    />
                    {searchValues.map(group => (
                        <div
                            className={SongsStyles.songs}
                            key={Math.random()}
                            style={{ height: "fit-content" }}
                        >
                            {group?.[0]?.key && <h2>{group?.[0]?.key}</h2>}
                            {group.map(res => (
                                <SongList
                                    song={res.element}
                                    key={res.element.id}
                                    searching={{
                                        state: true,
                                        key: res.key,
                                        value: res?.matched?.[0],
                                    }}
                                    cb={() => {
                                        setQueue(group.map(e => e.element));
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    );
}
