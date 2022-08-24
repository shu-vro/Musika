import { useMusicStore } from "./musicStore";

export const playlistStore = defineStore("playlistStore", {
    state: () => ({ playlists: [] }),
    actions: {
        getTracks(...id: string[]) {
            let tracks = useMusicStore().tracks;
            return tracks.filter(track => id.indexOf(track.id) !== -1);
        },
    },
});
