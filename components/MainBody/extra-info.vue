<template>
    <div class="extra-info">
        <table>
            <tr>
                <td>Track</td>
                <td>{{ song.trackName }}</td>
            </tr>
            <tr>
                <td>Artist</td>
                <td>{{ song.artist }}</td>
            </tr>
            <tr>
                <td>Album</td>
                <td>{{ song.album }}</td>
            </tr>
            <tr>
                <td>Genre</td>
                <td>{{ song.genre }}</td>
            </tr>
            <tr>
                <td>Track Length</td>
                <td>{{ song.trackLength }}</td>
            </tr>
            <tr>
                <td>Format</td>
                <td>{{ song.format }}</td>
            </tr>
            <tr>
                <td>Path</td>
                <td>{{ song.path }}</td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    song: {
        type: Object,
        default: {
            trackName: "Track Name",
            artist: "artist name",
            trackImage: "https://i.imgur.com/0Z0Z0Z0.png",
            loved: false,
            genre: "Me",
            path: "App Cache",
            trackLength: "3:00",
            album: "Some amazing album!",
            format: "audio/mp3",
        },
    },

})
</script>

<style lang="scss" scoped>
.extra-info {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 40%);
    opacity: 0;
    user-select: none;
    pointer-events: none;
    transition: .25s ease;

    &.show {
        opacity: 1;
    }
}
</style>
