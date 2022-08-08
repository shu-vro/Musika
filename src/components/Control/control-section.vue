<template>
    <div class="control-section">
        <div class="control-buttons">

            <button class="button repeat">
                <v-icon :name=RiRepeat2Fill.name scale="1.5"></v-icon>
            </button>
            <button class="button prev">
                <v-icon :name=MdSkippreviousRound.name scale="1.5"></v-icon>
            </button>
            <button class="button play">
                <v-icon :name=BiPlayFill.name scale="3"></v-icon>
            </button>
            <button class="button next">
                <v-icon :name=MdSkipnextRound.name scale="1.5"></v-icon>
            </button>

            <button class="button shuffle">
                <v-icon :name=BiShuffle.name scale="1.5"></v-icon>
            </button>
        </div>
        <div class="ladder">
            <span>0:30</span>
            <input
                type="range"
                class="progress"
                min="0"
                max="100"
                value="0" 
            />
            <span>3:00</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {MdSkippreviousRound, MdSkipnextRound, BiPlayFill, BiShuffle, RiRepeat2Fill} from 'oh-vue-icons/icons'
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

        button {
            outline: var(--theme);
        }    
    }

    .ladder {
        @include flex-center();
        flex-direction: row;
        width: 100%;

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
            background: #ccc;
            outline: none;
            overflow: hidden;
            transition: 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

            &::-webkit-slider-thumb{
                appearance: none;
                height: 15px;
                width: 15px;
                background: dodgerblue;
                border-radius: 50%;
                cursor: ew-resize;
                box-shadow: -1007.5px 0 0 1000px dodgerblue;
            }

            &:hover {
                height: 15px;
            }

        }
    }
}
</style>