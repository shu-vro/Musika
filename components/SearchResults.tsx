import { forwardRef, useEffect, useState } from "react";
import { TextField, Dialog, Button } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import SongList from "./Index/SongList";
import { useMusicStore } from "@contexts/MusicStore";
import SongsStyles from "@styles/Songs.module.scss";
import { ISearchFromValues } from "@ts/types";
import { useRippleRefresh } from "@contexts/RippleRefresh";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, setOpen }) {
    const rippleRefresh = useRippleRefresh();
    const [searchValues, setSearchValues] = useState<ISearchFromValues[][]>([
        [],
    ]);
    const handleClose = () => {
        setOpen(false);
    };
    const { setQueue, SearchFromValues } = useMusicStore();

    useEffect(() => {
        rippleRefresh.refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
                TransitionComponent={Transition}
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
                    <Button
                        onClick={handleClose}
                        style={{
                            color: "var(--color)",
                        }}
                    >
                        Close
                    </Button>
                </DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        label="Search By Anything"
                        variant="outlined"
                        fullWidth={true}
                        autoFocus
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
        </>
    );
}
