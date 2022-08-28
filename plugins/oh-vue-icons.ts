// import { OhVueIcon, addIcons } from "oh-vue-icons";
// import {
//     RiRepeat2Fill,
//     MdSkippreviousRound,
//     BiPlayFill,
//     MdSkipnextRound,
//     BiShuffle,
//     IoPause,
//     BiMusicNoteList,
//     GiBookshelf,
//     CoPlaylistAdd,
//     MdLyricsOutlined,
//     BiVolumeUpFill,
//     BiHeart,
//     BiHeartFill,
//     BiPlayCircle,
//     RiArrowGoBackLine,
// } from "oh-vue-icons/icons";

import OhVueIcon from "./OhVueIcon.vue";

export default defineNuxtPlugin(nuxtApp => {
    // addIcons(
    //     RiRepeat2Fill,
    //     MdSkippreviousRound,
    //     BiPlayFill,
    //     MdSkipnextRound,
    //     BiShuffle,
    //     IoPause,
    //     BiMusicNoteList,
    //     GiBookshelf,
    //     CoPlaylistAdd,
    //     MdLyricsOutlined,
    //     BiVolumeUpFill,
    //     BiHeart,
    //     BiHeartFill,
    //     BiPlayCircle,
    //     RiArrowGoBackLine
    // );
    nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
