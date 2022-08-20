<script lang="ts" setup>
import numeral from "numeral";
import { useSelectedMusicStore } from "~/stores/selectedMusicStore";
import { useVolumeStore } from "~/stores/volumeStore";
let { shuffle, playNext, playPrevious } = useSelectedMusicStore();
let selectedMusic = useSelectedMusicStore();
let currentTrack = selectedMusic.currentTrack;
const paused = ref(true);

function toggleMusicState() {
    audio.value.paused ? audio.value.play() : audio.value.pause();
    paused.value = audio.value.paused;
}
const audio = ref<HTMLAudioElement>();
let currentTime = ref(0);

selectedMusic.$subscribe(() => {
    if (selectedMusic.currentTrack) {
        audio.value.src = selectedMusic.currentTrack.src as string;
        audio.value.play();
    }
});

const audioLoop = ref(false);
function handleLoop() {
    if (!audio.value) return;
    audio.value.loop = !audio.value.loop;
    audioLoop.value = audio.value.loop;
}

function handleLadderChange(e: Event) {
    audio.value.currentTime = (e.target as HTMLInputElement)
        .value as unknown as number;
}

setInterval(() => {
    currentTime.value = Math.round(audio.value?.currentTime || 0);
}, 1000);

function normalizeTimeFormat(number: number) {
    let a: string = numeral(number).format("00:00:00");
    if (a.substring(0, 2) === "0:") {
        a = a.substring(2, a.length);
        return a;
    }
    return a;
}

onMounted(() => {
    audio.value.addEventListener("ended", () => {
        playNext();
    });
});

useVolumeStore().$subscribe(() => {
    audio.value.volume = useVolumeStore().volume / 100;
});
</script>

<template>
    <div class="control-section">
        <audio :src="currentTrack?.src as string" ref="audio" hidden autoplay />
        <div class="control-buttons">
            <button
                class="ripple button repeat"
                :class="{ active: audioLoop }"
                @click="handleLoop">
                <v-icon name="ri-repeat-2-fill" scale="1.5"></v-icon>
            </button>
            <button class="ripple button prev">
                <v-icon
                    name="md-skipprevious-round"
                    scale="1.5"
                    @click="playPrevious"></v-icon>
            </button>
            <button class="ripple button play" @click="toggleMusicState">
                <v-icon
                    :name="paused ? 'bi-play-fill' : 'io-pause'"
                    scale="3"></v-icon>
            </button>
            <button class="ripple button next" @click="playNext">
                <v-icon name="md-skipnext-round" scale="1.5"></v-icon>
            </button>

            <button class="ripple button shuffle" @click="shuffle">
                <v-icon name="bi-shuffle" scale="1.5"></v-icon>
            </button>
        </div>
        <div class="ladder">
            <span>{{ normalizeTimeFormat(currentTime) }}</span>
            <input
                type="range"
                class="progress"
                :value="currentTime"
                min="0"
                :max="Math.round(selectedMusic.currentTrack?.duration || 10)"
                @input="handleLadderChange" />
            <span>{{
                normalizeTimeFormat(selectedMusic.currentTrack?.duration)
            }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@mixin flex-center() {
    display: flex;
    justify-content: center;
    align-items: center;
}

.control-section {
    @include flex-center();
    flex-direction: column;
    width: 100%;

    .control-buttons {
        @include flex-center();
        flex-direction: row;

        .button {
            outline: var(--theme);
            border-radius: 50%;
            padding: 5px;
            margin: 2px 5px;

            &.active {
                color: var(--theme) !important;
            }
        }
    }

    .ladder {
        @include flex-center();
        flex-direction: row;
        width: min(100%, 550px);

        span {
            margin: 0 10px;
        }

        .progress {
            position: relative;
            appearance: none;
            flex-grow: 1;
            height: 8px;
            border-radius: 50px;
            display: block;
            background: var(--color);
            outline: none;
            overflow: hidden;
            transition: 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

            &::-webkit-slider-thumb {
                appearance: none;
                height: 15px;
                width: 15px;
                background: var(--theme);
                border-radius: 50%;
                cursor: ew-resize;
                box-shadow: -1007.5px 0 0 1000px var(--theme);
            }

            &:hover {
                height: 15px;
            }
        }
    }
}

@media (max-width: 367px) {
    .control-section {
        .control-buttons {
            .button {
                padding: 1px;
                margin: 0;
            }
        }
    }
}
</style>
