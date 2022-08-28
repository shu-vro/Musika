import { createContext, useContext, useState } from "react";
import type { IAudioMetadata } from "@ts/types";
import { useMusicStore } from "./MusicStore";

const Context = createContext({});

export function useSelectMusic(): {
    value?: IAudioMetadata;
    setValue?: React.Dispatch<React.SetStateAction<IAudioMetadata>>;
    /**
     * Shuffles the `MusicStore`. Mutates it's values. Effect on current track
     */
    shuffle?: VoidFunction;
    playNext?: VoidFunction;
    playPrevious?: VoidFunction;
} {
    return useContext(Context);
}

export function SelectMusicContext({ children }) {
    const [value, setValue] = useState<IAudioMetadata>(null);
    const musicStore = useMusicStore();

    function shuffle() {
        const tracks = [...musicStore.value];
        let array = tracks;
        let currentIndex = array.length,
            randomIndex: number;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        musicStore.setValue(tracks);
    }
    function playNext() {
        const tracks = [...musicStore.value];
        if (value) {
            setValue(tracks[(tracks.indexOf(value) + 1) % tracks.length]);
        }
    }
    function playPrevious() {
        const tracks = [...musicStore.value];
        if (value) {
            setValue(
                tracks[
                    (tracks.indexOf(value) - 1 + tracks.length) % tracks.length
                ]
            );
        }
    }
    return (
        <>
            <Context.Provider
                value={{ value, setValue, shuffle, playNext, playPrevious }}>
                {children}
            </Context.Provider>
        </>
    );
}