<script lang="ts" setup>
import { useShrinkNavigation } from "~/stores/shrinkNavigation";
import { useMusicStore } from "~/stores/musicStore";
const shrinkNavigation = useShrinkNavigation();
const musicStore = useMusicStore();
const route = useRoute();
const { song, artist, id, lyrics } = route.query;
const res = ref();
res.value = lyrics;
if (
    // if they exist
    song &&
    artist &&
    id &&
    lyrics === ""
) {
    console.log("fetching lyrics");
    $fetch(`/api/lyrics?song=${song}&artist=${artist}`)
        .then(r => {
            // @ts-ignore
            res.value = r.lyrics;

            if (id !== "") {
                let index = musicStore.tracks.findIndex(t => t.id === id);
                if (index !== -1) {
                    // @ts-ignore
                    musicStore.tracks[index].lyrics = r.lyrics;
                }
            }
        })
        .catch(() => {});
}
</script>
<template>
    <div class="main-body" :class="{ shrink: shrinkNavigation.shrink }">
        <h1>Lyrics</h1>
        <pre
            >{{ res }}
        
        
        </pre>
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

    pre {
        text-align: center;
        font-size: 1.3rem;
        font-family: inherit;
        overflow-y: auto;
        height: calc(100% - 50px);
    }
}

@media (max-width: 687px) {
    .main-body {
        width: 100% !important;
        height: calc(100% - 180px);
    }
}
</style>
