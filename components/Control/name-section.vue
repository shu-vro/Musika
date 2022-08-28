<script lang="ts" setup>
import { useSelectedMusicStore } from "~/stores/selectedMusicStore";

let selectedMusic = useSelectedMusicStore();
let lovedName = ref<`bi-heart` | `bi-heart-fill`>("bi-heart");
useSelectedMusicStore().$subscribe(() => {
    if (selectedMusic) {
        selectedMusic.currentTrack.loved
            ? (lovedName.value = "bi-heart-fill")
            : (lovedName.value = "bi-heart");
    }
});
function handleLoved() {
    if (selectedMusic) {
        selectedMusic.currentTrack.loved = !selectedMusic.currentTrack.loved;
        selectedMusic.currentTrack.loved
            ? (lovedName.value = "bi-heart-fill")
            : (lovedName.value = "bi-heart");
    }
}
</script>

<template>
    <div class="name-section">
        <img
            :src="
                selectedMusic.currentTrack?.picture || '../../assets/disk.png'
            "
            alt="" />
        <div class="details">
            <marquee behavior="scroll" direction="left">{{
                selectedMusic.currentTrack?.trackName
            }}</marquee>
            <p>{{ selectedMusic.currentTrack?.artist }}</p>
        </div>
        <v-icon :name="lovedName" @click="handleLoved"></v-icon>
    </div>
</template>

<style lang="scss" scoped>
.name-section {
    display: flex;
    align-items: center;

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: contain;
    }

    .details {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        marquee {
            min-width: 150px;
        }

        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 200px;
            font-size: 0.8rem;
            margin: 0;
            color: #ccc;
            font-style: italic;
            text-transform: capitalize;
        }
    }

    .ov-icon {
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>
