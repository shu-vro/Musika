import type { IAudioMetadata } from "~/types/types";
import { useMusicStore } from "./musicStore";

export const useSelectedMusicStore = defineStore("selectedMusicStore", {
    state: () =>
        ({ currentTrack: null } as {
            currentTrack: IAudioMetadata | null;
        }),
    actions: {
        setTrack(track: IAudioMetadata) {
            this.currentTrack = track;
        },
        shuffle() {
            let tracks = useMusicStore().tracks;
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

            tracks = array;
        },
        playNext() {
            const tracks = useMusicStore().tracks;
            if (this.currentTrack) {
                this.currentTrack =
                    tracks[
                        (tracks.indexOf(this.currentTrack) + 1) % tracks.length
                    ];
            }
        },
        playPrevious() {
            const tracks = useMusicStore().tracks;
            if (this.currentTrack) {
                this.currentTrack =
                    tracks[
                        (tracks.indexOf(this.currentTrack) -
                            1 +
                            tracks.length) %
                            tracks.length
                    ];
            }
        },
    },
});
