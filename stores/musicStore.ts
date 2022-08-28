import type { IArrayAudioMetaData } from "~/types/types";

export const useMusicStore = defineStore("musicStore", {
    state: () =>
        ({ tracks: [] } as {
            tracks: IArrayAudioMetaData;
        }),
});
