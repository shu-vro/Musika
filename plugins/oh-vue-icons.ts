import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    RiRepeat2Fill,MdSkippreviousRound, BiPlayFill, MdSkipnextRound, BiShuffle, IoPause, BiMusicNoteList, GiBookshelf, CoPlaylistAdd, MdLyricsOutlined, BiVolumeUpFill, BiHeart, BiHeartFill } from "oh-vue-icons/icons";

export default defineNuxtPlugin(nuxtApp => {
    addIcons(    RiRepeat2Fill,MdSkippreviousRound, BiPlayFill, MdSkipnextRound, BiShuffle, IoPause, BiMusicNoteList, GiBookshelf, CoPlaylistAdd, MdLyricsOutlined, BiVolumeUpFill, BiHeart, BiHeartFill);
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
