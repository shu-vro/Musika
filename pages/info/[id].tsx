import { useRouter } from "next/router";
import React from "react";
import Alert from "@mui/material/Alert";
import MainBody from "@components/MainBody";
import { useMusicStore } from "@contexts/MusicStore";
import {
    AlertTitle,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";
import { IAudioMetadata } from "@ts/types";
import defaultImage from "../../assets/disk.png";
import { MdExpandMore } from "react-icons/md";

export default function Id() {
    const router = useRouter();
    const musicStore = useMusicStore();
    const { musicId } = router.query;
    let message = "";

    if (!musicId) message = "MusicId Not Provided";
    let song: IAudioMetadata =
        musicStore.value.find(value => value.id === musicId) ||
        ({} as IAudioMetadata);
    if (!song) message = "Not a valid MusicId";

    return (
        <>
            <MainBody title="Music Details">
                <div>
                    {message && (
                        <Alert
                            severity="error"
                            variant="filled"
                            sx={{
                                margin: `0px auto`,
                                maxWidth: "50%",
                            }}>
                            <AlertTitle>Error</AlertTitle>
                            {message}
                        </Alert>
                    )}
                    {song?.picture ? (
                        <DisplayImage src={song.picture} alt={song.trackName} />
                    ) : (
                        <DisplayImage
                            src={defaultImage.src}
                            alt="Track thumbnail"
                        />
                    )}
                    {Object.keys(song).length > 0 && (
                        <TableContainer
                            sx={{
                                borderRadius: "10px",
                                background: `rgba(255, 255, 255, 10%)`,
                                backdropFilter: "blur(10px)",
                                margin: `30px 20px`,
                                width: `auto`,
                            }}>
                            <Table>
                                {Object.entries(song).map(
                                    ([key, value]: [string, string]) => {
                                        if (
                                            key.match(
                                                /^picture$|^src$|^loved$|^lyrics$/
                                            )
                                        )
                                            return;
                                        return (
                                            <TableRow key={key}>
                                                <TableCell
                                                    sx={{
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}>
                                                    <b>{key}</b>
                                                </TableCell>
                                                <TableCell>{value}</TableCell>
                                            </TableRow>
                                        );
                                    }
                                )}
                                <TableRow>
                                    <TableCell
                                        colSpan={2}
                                        sx={{
                                            padding: "0",
                                            border: "none",
                                        }}>
                                        <Accordion
                                            sx={{
                                                background: "transparent",
                                                color: `var(--color)`,
                                                width: `100%`,
                                            }}>
                                            <AccordionSummary
                                                expandIcon={
                                                    <MdExpandMore
                                                        size="1.5rem"
                                                        fill="var(--color)"
                                                    />
                                                }>
                                                Lyrics
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <pre>{song?.lyrics}</pre>
                                            </AccordionDetails>
                                        </Accordion>
                                    </TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </MainBody>
        </>
    );
}

function DisplayImage({ src, alt }) {
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                style={{
                    width: `300px`,
                    display: "block",
                    margin: `0 auto`,
                }}
            />
        </>
    );
}
