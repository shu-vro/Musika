<script lang="ts" setup>
import { useSelectedMusicStore } from "~/stores/selectedMusicStore";
let selectedMusicStore = useSelectedMusicStore();
definePageMeta({
    pageTransition: {
        mode: "in-out",
        name: "page",
    },
});
const image = ref<HTMLImageElement>();
let imageHeight = ref(0);
onMounted(() => {
    function setWidth() {
        try {
            setTimeout(() => {
                let { y } = image.value.getBoundingClientRect();
                let targetElHeight =
                    image.value.parentElement.parentElement.offsetHeight;
                imageHeight.value = targetElHeight - y;
            }, 500);
        } catch (e) {}
    }
    setWidth();
    window.addEventListener("resize", setWidth);
});
</script>
<template>
    <main-body title="Playing">
        <div>
            <h1>{{ selectedMusicStore.currentTrack?.trackName }}</h1>
            <p>{{ selectedMusicStore.currentTrack?.artist }}</p>
            <img
                is="imageHeight !== 0"
                :height="imageHeight"
                ref="image"
                :src="
                    selectedMusicStore.currentTrack?.picture ||
                    '../assets/disk.png'
                "
                :alt="
                    selectedMusicStore.currentTrack?.trackName ||
                    `Default Picture`
                " />
        </div>
    </main-body>
</template>
<style lang="scss" scoped>
div {
    position: relative;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: max(3vw, 20px);
    }
}
</style>
