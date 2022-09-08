import { useRouter } from "next/router";
import React from "react";
import Alert from "@mui/material/Alert";
import MainBody from "@components/MainBody";
import { useMusicStore } from "@contexts/MusicStore";

export default function Id() {
    const router = useRouter();
    const musicStore = useMusicStore();
    const { musicId } = router.query;
    let message = "";

    if (!musicId) message = "MusicId Not Provided";
    let song = musicStore.value.find(value => value.id === musicId);
    if (!song) message = "Not a valid MusicId";

    return message ? (
        <>
            <MainBody title="Info">
                <Alert severity="error">{message}</Alert>
            </MainBody>
        </>
    ) : (
        <>
            <MainBody title="Info">Hello world</MainBody>
        </>
    );
}
