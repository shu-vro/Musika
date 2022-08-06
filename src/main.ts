import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiMusicNoteList, BiPlayFill, MdSkipnextRound , MdSkippreviousRound , CoPlaylistAdd, GiBookshelf, FaBars  } from "oh-vue-icons/icons";

addIcons(BiMusicNoteList, BiPlayFill, MdSkipnextRound , MdSkippreviousRound, CoPlaylistAdd , GiBookshelf, FaBars );
const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
