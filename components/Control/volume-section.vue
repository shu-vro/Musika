<script lang="ts" setup>
import { useVolumeStore } from "~/stores/volumeStore";
import { useSelectedMusicStore } from "~/stores/selectedMusicStore";
const router = useRouter();

function navigate() {
    const current = router.currentRoute.value.path;
    const song = useSelectedMusicStore().currentTrack?.trackName || "";
    const artist = useSelectedMusicStore().currentTrack?.artist || "";
    const id = useSelectedMusicStore().currentTrack?.id || "";
    const lyrics = useSelectedMusicStore().currentTrack?.lyrics || "";
    // if (current === "/lyrics") {
    //     router.back();
    // } else {
    //     router.push({
    //         path: "/lyrics",
    //         query: {
    //             song,
    //             artist,
    //             id,
    //             lyrics,
    //         },
    //     });
    // }
}
</script>

<template>
    <div class="volume-section">
        <button @click="navigate">
            <v-icon name="md-lyrics-outlined" scale="1.2"></v-icon>
        </button>
        <button class="volume">
            <v-icon name="bi-volume-up-fill" scale="1.5"></v-icon>
            <input
                type="range"
                class="progress"
                min="0"
                max="100"
                v-model="useVolumeStore().volume" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
@mixin flex-center() {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.volume-section {
    @include flex-center();

    .volume {
        position: relative;
        @include flex-center();

        .ov-icon {
            margin-right: 5px;
        }

        .progress {
            position: relative;
            width: 0px;
            appearance: none;
            flex-grow: 1;
            height: 8px;
            border-radius: 50px;
            display: block;
            background: var(--color);
            outline: none;
            overflow: hidden;
            transition: 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

            &::-webkit-slider-thumb {
                appearance: none;
                height: 15px;
                width: 15px;
                background: var(--theme);
                border-radius: 50%;
                cursor: ew-resize;
                box-shadow: -1007.5px 0 0 1000px var(--theme);
            }

            &:hover {
                height: 15px;
            }
        }

        &:hover {
            .progress {
                width: 130px;
            }
        }
    }
}
</style>
