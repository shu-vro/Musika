import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
    BiMusicNoteList,
    BiPlayFill,
    MdSkipnextRound,
    MdSkippreviousRound,
    CoPlaylistAdd,
    GiBookshelf,
    FaBars,
    BiHeart,
    BiHeartFill,
    BiShuffle,
    RiRepeat2Fill,
    BiVolumeUpFill,
    IoPause,
    MdLyricsOutlined,
} from "oh-vue-icons/icons";

addIcons(
    BiMusicNoteList,
    BiPlayFill,
    MdSkipnextRound,
    MdSkippreviousRound,
    CoPlaylistAdd,
    GiBookshelf,
    FaBars,
    BiHeart,
    BiHeartFill,
    BiShuffle,
    RiRepeat2Fill,
    BiVolumeUpFill,
    IoPause,
    MdLyricsOutlined,
);
const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
