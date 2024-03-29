import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
    Alert,
    AlertTitle,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    TableBody,
} from "@mui/material";
import { IAudioMetadata } from "@ts/types";
import defaultImage from "../../assets/disk.png";
import MainBody from "@components/MainBody";
import { useMusicStore } from "@contexts/MusicStore";
import { useSelectMusic } from "@contexts/SelectMusic";
import { normalizeTimeFormat } from "@utils/utils";
import numeral from "numeral";
import Head from "next/head";
import Image from "next/image";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Id() {
    const router = useRouter();
    const musicStore = useMusicStore();
    const selectedMusic = useSelectMusic();
    const { musicId } = router.query;
    const [message, setMessage] = useState("");
    let song =
        musicStore.value.find(value => value.id === musicId) ||
        ({} as IAudioMetadata);

    useEffect(() => {
        if (!musicId) setMessage("MusicId Not Provided");
        if (!song) setMessage("Not a valid MusicId");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleLoved() {
        if (song?.loved === null || !musicId || !Object.keys(song).length)
            return;
        musicStore.setUsingId(musicId as string, {
            loved: !song.loved,
        });
        if (musicId === selectedMusic.value?.id) {
            selectedMusic.setValue(prev => {
                let temp = { ...prev };
                temp.loved = song.loved;
                return temp;
            });
        }
    }

    return (
        <>
            <Head>
                <title>
                    Music Details - {song?.trackName ? song.trackName : ""} -
                    MUSIKA
                </title>
            </Head>
            <MainBody title="Music Details">
                {message && (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{
                            margin: `0px auto`,
                            maxWidth: "50%",
                        }}
                    >
                        <AlertTitle>Error</AlertTitle>
                        {message}
                    </Alert>
                )}
                <Image
                    src={song?.thumbnail?.["original"] || defaultImage}
                    alt={song?.trackName || "Track Thumbnail"}
                    style={{
                        width: `auto`,
                        height: "300px",
                        display: "block",
                        margin: `0 auto`,
                    }}
                    width={300}
                    height={300}
                />
                {Object.keys(song).length && (
                    <TableContainer
                        sx={{
                            borderRadius: "10px",
                            background: `rgba(255, 255, 255, 10%)`,
                            backdropFilter: "blur(10px)",
                            margin: `30px 20px`,
                            width: `auto`,
                        }}
                    >
                        <Table>
                            <TableBody>
                                {Object.entries(song).map(
                                    ([key, value]: [string, string]) => {
                                        // JUST FOR LOVED PARAMETER
                                        if (key === "loved") {
                                            return (
                                                <TableRow key={key}>
                                                    <TableCell
                                                        sx={{
                                                            textOverflow:
                                                                "ellipsis",
                                                        }}
                                                    >
                                                        <b>
                                                            {capitalizeFirstLetter(
                                                                key
                                                            )}
                                                        </b>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={
                                                                handleLoved
                                                            }
                                                        >
                                                            {value ? (
                                                                <AiFillHeart size="1.5rem" />
                                                            ) : (
                                                                <AiOutlineHeart size="1.5rem" />
                                                            )}
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                        if (
                                            key.match(
                                                /^thumbnail$|^src$|^loved$|^lyrics$|^id$/
                                            )
                                        )
                                            return;
                                        return (
                                            <TableRow key={key}>
                                                <TableCell
                                                    sx={{
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    <b>
                                                        {capitalizeFirstLetter(
                                                            key
                                                        )}
                                                    </b>
                                                </TableCell>
                                                <TableCell>
                                                    {key === "duration"
                                                        ? normalizeTimeFormat(
                                                              song?.duration ||
                                                                  0
                                                          )
                                                        : key === "size"
                                                        ? numeral(value).format(
                                                              "0.00b"
                                                          )
                                                        : String(value)}
                                                </TableCell>
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
                                        }}
                                    >
                                        <Accordion
                                            sx={{
                                                background: "transparent",
                                                color: `var(--color)`,
                                                width: `100%`,
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={
                                                    <MdExpandMore
                                                        size="1.5rem"
                                                        fill="var(--color)"
                                                    />
                                                }
                                            >
                                                Lyrics
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <pre>{song?.lyrics}</pre>
                                            </AccordionDetails>
                                        </Accordion>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </MainBody>
        </>
    );
}
