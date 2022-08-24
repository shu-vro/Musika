<script lang="ts" setup>
import { useMusicStore } from "~/stores/musicStore";
import { useSelectedMusicStore } from "~/stores/selectedMusicStore";
import { useRippleRefresh } from "~/stores/rippleRefresh";
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
    <main-body title="Playlists">
        <div class="playlists">
            <div
                class="playlist ripple"
                v-for="song in tracks"
                :key="song.id"
                @click="setTrack(song)">
                <img
                    :src="song.picture || '../../assets/disk.png'"
                    :alt="song.trackName" />
                <marquee class="song-title">{{ song.trackName }}</marquee>
                <div class="song-artist">{{ song.artist }}</div>
                <div class="playCursor">
                    <v-icon name="bi-play-circle" scale="4"></v-icon>
                </div>
            </div>
        </div>
    </main-body>
</template>

<style lang="scss" scoped>
.playlists {
    position: relative;
    width: calc(100% - 41px);
    height: calc(100% - 75px);
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 20px;

    .playlist {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 150px;
        min-height: 150px;
        background: rgba(0, 0, 0, 40%);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        margin: 10px;
        padding: 10px 20px;
        cursor: none;

        img {
            width: 130px;
            object-fit: cover;
        }

        .song-title {
            font-size: 1.2rem;
        }

        .song-artist {
            font-size: 0.9rem;
        }

        .playCursor {
            position: absolute;
            top: var(--y);
            left: var(--x);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        &:hover {
            .playCursor {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    }
}
</style>
