import type { IAudioMetadata, IArrayAudioMetaData } from "~/types/types";

export const useMusicStore = defineStore("musicStore", {
    state: () =>
        ({ tracks: [], currentTrack: null } as {
            tracks: IArrayAudioMetaData;
        }),
});
