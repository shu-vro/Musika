export const useShrinkNavigation = defineStore("shrink", {
    state: () => ({ shrink: false }),
    getters: {},
    actions: {
        invert() {
            this.shrink = !this.shrink;
        },
    },
});
