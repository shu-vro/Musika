<template>
    <div class="nav" :class="{ shrink: shrink }">
        <a href="/" class="logo">MUSIKA</a>
        <input type="file" accept="audio/*" ref="input_file" hidden multiple @change="handleChangeFiles" />
        <button class="closeButton" @click="handleClose">
            <hamburger-button :class="{ opened: shrink }"></hamburger-button>
        </button>
        <ul>
            <li class="ripple">
                <v-icon name="bi-music-note-list" scale="1.5"></v-icon>
                <span>Playing</span>
            </li>
            <li class="ripple active">
                <v-icon name="gi-bookshelf" scale="1.5"></v-icon>
                <span>Play List</span>
            </li>
            <li class="ripple" @click="handlePickFile">
                <v-icon name="co-playlist-add" scale="1.5"></v-icon>
                <span>Add Songs</span>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import hamburgerButton from "./hamburger-button.vue";
let inputFiles = ref()
let resolvedFiles = ref([])
// @ts-ignore
import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js'
// @ts-ignore
import { v4 } from 'uuid'
const shrink = ref(false);
const input_file = ref<HTMLInputElement>()

interface IRes {
    id: any;
    trackName: any;
    artist: any;
    loved: boolean;
    genre: any;
    path: string;
    size: number;
    picture: any;
    album: any;
    format: string;
    lyrics: string;
}

watch(inputFiles, (current) => {
    for (let i = 0; i < current.length; i++) {
        const file: File = current[i];
        jsmediatags.read(file, {
            onSuccess: async function (media) {
                let res: IRes = {
                    id: v4(),
                    trackName: media.tags.title || file.name,
                    artist: media.tags.artist,
                    loved: false,
                    genre: media.tags.genre,
                    path: "App Cache",
                    size: file.size,
                    picture: media.tags.picture,
                    album: media.tags.album,
                    format: file.type,
                    lyrics: ''
                }
                res['lyrics'] = (await $fetch(`/api/lyrics?song=${res.trackName}&artist=${res.artist}`) as { lyrics: string, statusCode: number }).lyrics
                resolvedFiles.value.push(res)
            },
            onError: function (error) {
                console.log(error)
            }
        })
    }
})

function handleClose() {
    shrink.value = !shrink.value;
}

function handlePickFile() {
    input_file.value?.click();
}

function handleChangeFiles(e) {
    inputFiles.value = e.target.files
}
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap");

div.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    backdrop-filter: blur(5px);
    display: block;
    overflow: hidden;
    border-right: 2px solid rgba(255, 255, 255, 0.1);
    transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 3;

    .closeButton {
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
        color: white;
        width: 60px;
    }

    &.shrink {
        width: 65px;

        ul {
            li {
                height: 40px;

                span {
                    display: none;
                }
            }
        }
    }

    .logo {
        position: relative;
        width: 100%;
        display: block;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        padding: 20px 0;
        color: white;
        font-size: 2rem;
        font-weight: bold;
        font-family: "Zen Dots", cursive;
        background: linear-gradient(90deg, #ff0077, #333399);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

    }

    ul {
        position: relative;
        list-style: none;
        padding: 0;

        li {
            position: relative;
            padding: 10px;
            margin-top: 15px;
            border-top: 2px solid rgba(255, 255, 255, 0.2);
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.089);
            backdrop-filter: blur(20px);
            cursor: pointer;
            line-height: 40px;
            border-radius: 15px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            display: flex;
            justify-content: left;
            align-items: center;

            span {
                margin-left: 10px;
                transition-delay: 0.3s;
                display: inline-block;
                text-overflow: ellipsis;
                // width: 200px;
                white-space: nowrap;
                overflow: hidden;
            }

            &.active::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 6px;
                height: 100%;
                background: var(--theme);
            }
        }
    }
}

@media (max-width: 687px) {
    div.nav {
        top: inherit;
        bottom: 0;
        left: 0;
        width: 100% !important;
        height: 80px;
        border: none;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &.shrink {
            width: 100%;

            ul {
                li {
                    height: 100%;

                    span {
                        display: block;
                    }
                }
            }
        }

        .logo {
            display: none;
        }

        .closeButton {
            display: none;
        }

        ul {
            position: absolute;
            bottom: 0;
            margin: auto;
            width: 100%;
            height: 80px;
            display: flex;

            &>* {
                flex-basis: 100%;
            }

            li {
                position: relative;
                padding: 0;
                display: inline-block;
                color: white;
                cursor: pointer;
                line-height: 40px;
                text-align: center;
                border-radius: 15px;
                margin: 0;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;

                &.active::after {
                    content: "";
                    position: absolute;
                    top: inherit;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 6px;
                    background: var(--theme);
                }

                span {
                    display: block;
                    font-size: 15px;
                    margin: 0;
                }
            }
        }
    }
}
</style>
