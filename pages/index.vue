<script lang="ts" setup>
import { useMusicStore } from "~/stores/musicStore";
import { useRippleRefresh } from "~/stores/rippleRefresh";

useMusicStore().$subscribe(() => {
    useRippleRefresh().refresh();
});

onMounted(() => {
    useRippleRefresh().refresh();
});
definePageMeta({
    pageTransition: {
        name: "page",
        mode: "in-out",
    },
});
</script>
<template>
    <main-body title="Playlists">
        <div class="playlists">
            <nuxt-link to="/playlist_" class="playlist ripple">
                <div class="image">
                    <img
                        v-for="i in 4"
                        :src="
                            useMusicStore().tracks[i - 1]?.picture ||
                            `../../assets/photo.jpg`
                        "
                        alt="playlist" />
                </div>
                <div class="playlist-title">All</div>
                <div class="playlist-description">Some description</div>
                <div class="playCursor">
                    <v-icon name="bi-play-circle" scale="4"></v-icon>
                </div>
            </nuxt-link>
        </div>
    </main-body>
</template>

<style lang="scss" scoped>
.playlists {
    position: relative;
    width: calc(100% - 41px);
    height: calc(100% - 75px);
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 20px;

    .playlist {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 150px;
        min-height: 150px;
        background: rgba(0, 0, 0, 40%);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        margin: 10px;
        padding: 10px 20px;
        cursor: none;

        .image {
            width: 130px;
            height: 130px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            img {
                width: 100%;
            }
        }

        .playlist-title {
            font-size: 1.2rem;
        }

        .playlist-description {
            font-size: 0.9rem;
        }

        .playCursor {
            position: absolute;
            top: var(--y);
            left: var(--x);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        &:hover {
            .playCursor {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    }
}
</style>
