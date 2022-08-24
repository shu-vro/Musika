<script setup lang="ts">
import { useMusicStore } from "~/stores/musicStore";
import { useSelectedMusicStore } from "~/stores/selectedMusicStore";
import { useRippleRefresh } from "~/stores/rippleRefresh";
import { normalizeTimeFormat } from "@/utils/utils";
let tracks = useMusicStore().tracks;
let setTrack = useSelectedMusicStore().setTrack;

useMusicStore().$subscribe(() => {
    useRippleRefresh().refresh();
});

onMounted(() => {
    useRippleRefresh().refresh();
});
definePageMeta({
    pageTransition: {
        name: "page",
        mode: "in-out",
    },
});
</script>
<template>
    <main-body title="Songs">
        <div class="songs">
            <div class="image">
                <img src="../../assets/bg.jpg" alt="playlist" />
            </div>
            <div
                class="song ripple"
                v-for="song in tracks"
                @click="setTrack(song)">
                <div>
                    <img
                        :src="song.picture || '../../assets/disk.png'"
                        :alt="song.trackName" />
                    <div class="song-title">{{ song.trackName }}</div>
                </div>
                <i class="song-artist">{{ song.artist }}</i>
                <b>{{ normalizeTimeFormat(song.duration) }}</b>
            </div>
        </div>
    </main-body>
</template>

<style lang="scss" scoped>
.songs {
    position: relative;
    width: 100%;
    height: calc(100% - 75px);
    overflow-y: auto;
    padding: 0;

    .image {
        position: relative;
        width: 100%;
        height: 50%;
        overflow: hidden;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.404);

        img {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .song {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        min-height: 80px;
        background: rgba(0, 0, 0, 40%);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        margin: 10px;
        padding: 10px 20px;
        cursor: pointer;

        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;

            img {
                width: 70px;
                object-fit: cover;
                border-radius: 50%;
            }

            .song-title {
                font-size: 1.3rem;
                font-weight: 600;
                font-style: italic;
            }
        }
    }
}
</style>
