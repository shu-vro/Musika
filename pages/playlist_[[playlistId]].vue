<script setup lang="ts">
import { useMusicStore } from "~/stores/musicStore";
import { useSelectedMusicStore } from "~/stores/selectedMusicStore";
import { useRippleRefresh } from "~/stores/rippleRefresh";
import { normalizeTimeFormat } from "@/utils/utils";
const router = useRouter();
const { params } = useRoute();
let tracks = useMusicStore().tracks;
let setTrack = useSelectedMusicStore().setTrack;

if (params.playlistId === "") {
    tracks = useMusicStore().tracks;
} else {
    // TODO: validate playlists
}

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
                <v-icon
                    name="ri-arrow-go-back-line"
                    scale="1.5"
                    @click="router.back()"></v-icon>
                <img
                    :src="tracks[0]?.picture || '../../assets/photo.jpg'"
                    alt="playlist" />
                <h1>Playlist Name</h1>
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

        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 20%;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
            z-index: 1;
        }

        .ov-icon {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 2;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(4px);
            padding: 10px;
            cursor: pointer;
        }

        img {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        h1 {
            text-align: center;
            position: absolute;
            bottom: 0;
            width: 100%;
            font-family: "Zen dots", cursive;
            margin-bottom: 10px;
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
            width: 50%;

            img {
                width: 70px;
                object-fit: cover;
                border-radius: 50%;
            }

            .song-title {
                font-size: 1.3rem;
                font-weight: 600;
                font-style: italic;
                width: 100%;
            }
        }
    }
}
</style>
