export const useRippleRefresh = defineStore("rippleRefresh", {
    state: () => ({ ripples: [] }),
    actions: {
        refresh() {
            setTimeout(() => {
                this.ripples = document.querySelectorAll(".ripple");
            }, 1000);
        },
    },
});
