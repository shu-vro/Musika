<script lang="ts" setup>
import { useMusicStore } from "~/stores/musicStore";
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
definePageMeta({
    pageTransition: {
        mode: "in-out",
        name: "page",
    },
});
</script>
<template>
    <main-body title="Lyrics">
        <pre
            >{{ res }}
        
        
        </pre>
    </main-body>
</template>

<style lang="scss" scoped>
pre {
    text-align: center;
    font-size: 1.3rem;
    font-family: inherit;
    overflow-y: auto;
    height: calc(100% - 50px);
}
</style>
