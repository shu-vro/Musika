<template>
    <div class="name-section">

        <img :src="trackImage || '../../assets/disk.png'" alt="">
        <div class="details">
            <marquee behavior="scroll" direction="left">{{ trackName }}</marquee>
            <p>{{ artist }}</p>
        </div>
        <v-icon :name=lovedName @mouseover="lovedName = `bi-heart-fill`" @mouseleave="lovedName = `bi-heart`"></v-icon>
    </div>
</template>
<script lang="ts" setup>
let lovedName = ref('bi-heart')

defineProps({
    trackName: {
        type: String,
        default: "Track Name",
    },
    artist: {
        type: String,
        default: "artist name",
    },
    trackImage: {
        type: String,
    },
    loved: {
        type: Boolean,
        default: false,
    },
})
</script>

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
