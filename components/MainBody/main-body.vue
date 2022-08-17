<script lang="ts" setup>
import { useShrinkNavigation } from '~/stores/shrinkNavigation'
import { useMusicStore } from '~/stores/musicStore'
import { useSelectedMusicStore } from '~/stores/selectedMusicStore'
const shrinkNavigation = useShrinkNavigation()
let tracks = useMusicStore().tracks
let setTrack = useSelectedMusicStore().setTrack

function handleSetTrack(track: any) {
    setTrack(track)
}
</script>
<template>
    <div class="main-body" :class="{ shrink: shrinkNavigation.shrink }">
        <h1>Songs</h1>
        <div class="songs">
            <div class="song ripple" v-for="song in tracks" :key="song.id" @click="handleSetTrack(song)">
                <img :src="song.picture" :alt="song.trackName">
                <h3 class="song-title">{{ song.trackName }}</h3>
                <div class="song-artist">{{ song.artist }}</div>
                <div class="playCursor">
                    <v-icon name="bi-play-circle" scale="4"></v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-body {
    $width: calc(100% - 202px);
    $height: calc(100% - 100px);
    position: fixed;
    right: 0;
    top: 0;
    width: $width;
    height: $height;
    background: rgba(0, 0, 0, 40%);
    backdrop-filter: blur(10px);
    transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    &.shrink {
        width: calc(100% - 62px);
    }

    h1 {
        text-align: center;
        font-size: 1.3rem;
    }

    .songs {
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

        .song {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 150px;
            min-height: 100px;
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
                transition: opacity .3s ease-in-out, transform .3s ease-in-out;
            }

            &:hover {
                .playCursor {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        }
    }
}

@media (max-width: 687px) {
    .main-body {
        width: 100% !important;
        height: calc(100% - 180px);
    }
}
</style>
