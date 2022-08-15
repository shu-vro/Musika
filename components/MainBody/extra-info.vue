<script lang="ts" setup>
defineProps({
    song: {
        type: Object,
        default: {
            id: 1,
            trackName: "Some amazing name!",
            artist: 'Some amazing artist',
            loved: false,
            genre: "Me",
            path: "App cache",
            size: 1000000,
            picture: 'some image',
            album: 'wonderful album',
            format: 'audio/mp3',
            lyrics: '',
        },
    },
});
const info_panel = ref<HTMLDivElement>()
const active = ref(false)
onMounted(() => {
    const parent = info_panel.value.parentElement
    const allSongs = parent.querySelectorAll('.song')

    function getPos(e: any) {
        return e.type.includes('touch') ? e = e.touches[0] : e = e
    }

    function moving(e, parentX, parentY) {
        if (!info_panel.value) return
        let x = getPos(e).clientX - parentX;
        let y = getPos(e).clientY - parentY;
        info_panel.value.style.left = x + 'px'
        info_panel.value.style.top = y + 'px'
        active.value = true;
    }

    allSongs.forEach((song: HTMLDivElement) => {
        let parentX = parent.getBoundingClientRect().x;
        let parentY = parent.getBoundingClientRect().y;
        song.addEventListener('mousemove', (e) => {
            moving(e, parentX, parentY)
        })
        song.addEventListener('touchstart', (e) => {
            moving(e, parentX, parentY)
        })
        song.addEventListener('mouseleave', () => active.value = false)
        song.addEventListener('touchend', () => active.value = false)
    });
})
</script>

<template>
    <div class="extra-info" :class="{ show: active }" ref="info_panel">
        <table rules="all">
            <tr v-for="(key, value) in song">
                <td>{{ value }}</td>
                <td>{{ key }}</td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.extra-info {
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(52, 56, 68);
    opacity: 0;
    user-select: none;
    pointer-events: none;
    padding: 5px 10px;
    transition: opacity .25s ease-in-out;

    &.show {
        opacity: 1;
    }

    table {
        border-color: white;
    }
}
</style>
