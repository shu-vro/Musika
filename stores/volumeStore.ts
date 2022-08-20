export const useVolumeStore = defineStore("volumeStore", {
    state: () => ({
        volume: 100,
    }),
    actions: {
        setVolume(volume) {
            this.volume = volume;
        },
    },
});
