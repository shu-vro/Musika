<template>
    <div class="control-section">
        <div class="control-buttons">
            <button class="ripple button repeat" v-tooltip="'This button deletes our universe'">
                <v-icon :name="RiRepeat2Fill.name" scale="1.5"></v-icon>
            </button>
            <button class="ripple button prev">
                <v-icon :name="MdSkippreviousRound.name" scale="1.5"></v-icon>
            </button>
            <button class="ripple button play" @click="toggleMusicState">
                <v-icon :name="paused ? BiPlayFill.name : IoPause.name" scale="3"></v-icon>
            </button>
            <button class="ripple button next">
                <v-icon :name="MdSkipnextRound.name" scale="1.5"></v-icon>
            </button>

            <button class="ripple button shuffle">
                <v-icon :name="BiShuffle.name" scale="1.5"></v-icon>
            </button>
        </div>
        <div class="ladder">
            <span>0:30</span>
            <input type="range" class="progress" min="0" max="100" value="0" />
            <span>3:00</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {
    MdSkippreviousRound,
    MdSkipnextRound,
    BiPlayFill,
    BiShuffle,
    RiRepeat2Fill,
    IoPause
} from "oh-vue-icons/icons";
import {ref} from 'vue'
let paused = ref(true);
function toggleMusicState() {
    paused.value= !paused.value;
}
</script>

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
