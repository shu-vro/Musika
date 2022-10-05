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
    setNext?: (song: IAudioMetadata) => void;
} {
    return useContext(Context);
}

export function SelectMusicContext({ children }) {
    const [value, setValue] = useState<IAudioMetadata>(null);
    const musicStore = useMusicStore();

    function shuffle() {
        const tracks = [...musicStore.queue];
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
        musicStore.setQueue(tracks);
    }
    function playNext() {
        const tracks = [...musicStore.queue];
        if (value) {
            setValue(tracks[(tracks.indexOf(value) + 1) % tracks.length]);
        }
    }
    function playPrevious() {
        const tracks = [...musicStore.queue];
        if (value) {
            setValue(
                tracks[
                    (tracks.indexOf(value) - 1 + tracks.length) % tracks.length
                ]
            );
        }
    }
    function setNext(song: IAudioMetadata) {
        const tracks = [...musicStore.queue];
        let index = tracks.indexOf(value) + 1;

        // find and remove track if it is previously there!
        let indexPrevious = tracks.findIndex(e => e.id === song.id);
        tracks.splice(indexPrevious, 1);

        tracks.splice(index, 0, song);
        musicStore.setQueue(tracks);
    }
    return (
        <>
            <Context.Provider
                value={{
                    value,
                    setValue,
                    shuffle,
                    playNext,
                    playPrevious,
                    setNext,
                }}
            >
                {children}
            </Context.Provider>
        </>
    );
}
