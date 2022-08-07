<template
>
    <div>
        <img :src=trackImage alt="">
        <div class="details">
            <h3>{{ trackName }}</h3>
            <p>{{ artist }}</p>
        </div>
        <v-icon :name=lovedName @mouseover="lovedName = `bi-heart-fill`" @mouseleave="lovedName = `bi-heart`"></v-icon>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
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
        default: require(`../../assets/disk.png`),
    },
    loved: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped>
div {
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

        h3 {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 200px;
            font-size: 1.2rem;
            font-weight: 500;
            margin: 0;
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
