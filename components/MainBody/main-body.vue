<template>
    <div class="main-body">
        <h1>Songs</h1>
        <div class="songs">
            <div class="song ripple" v-for="song in songs" :key="song.id">
                <marquee behavior="scroll" direction="left" class="song-title">{{ song.trackName }}</marquee>
                <div class="song-artist">{{ song.artist }}</div>
            </div>

            <main-body-extra-info />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
let songs = ref([
    {
        id: 1,
        trackName: "Some amazing name!",
        artist: "Some amazing artist!",
        loved: false,
        genre: "Me",
        path: "App Cache",
        trackLength: "3:00",
        album: "Some amazing album!",
        format: "audio/mp3",
    },
    {
        id: 2,
        trackName: "Some amazing name!",
        artist: "Some amazing artist!",
        loved: false,
        genre: "Me",
        path: "App Cache",
        trackLength: "3:00",
        album: "Some amazing album!",
        format: "audio/mp3",
    },
]);
</script>
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
            padding: 0 20px;
            cursor: pointer;

            .song-title {
                font-size: 1.2rem;
            }

            .song-artist {
                font-size: 0.9rem;
            }
        }
    }
}
</style>
