import React from "react";
import { GiMusicalNotes, GiBookshelf } from "react-icons/gi";
import { RiPlayListAddLine } from "react-icons/ri";
import styles from "@styles/Navigation.module.scss";
import Hamburger from "./Hamburger";
import { useShrinkNavigation } from "contexts/shrinkNavigation";

export default function Navigation() {
    let shrink = useShrinkNavigation();
    function handleShrink() {
        console.log(shrink.value);
        shrink.setValue(!shrink.value);
    }
    return (
        <>
            <div
                className={`${styles.nav} ${
                    shrink.value ? styles.shrink : ""
                }`}>
                <a href="./" className={styles.logo}>
                    MUSIKA
                </a>
                <input
                    type="file"
                    id="input_file"
                    accept="audio/*"
                    hidden
                    multiple
                />
                <button className="closeButton" onClick={handleShrink}>
                    <Hamburger />
                </button>

                <ul>
                    <li className="ripple">
                        <GiMusicalNotes
                            size={shrink.value ? "2rem" : "1.5rem"}
                        />
                        <span>Playing</span>
                    </li>
                    <li className="ripple active">
                        <GiBookshelf size={shrink.value ? "2rem" : "1.5rem"} />
                        <span>Play List</span>
                    </li>
                    <li
                        className="ripple"
                        onClick={() =>
                            document.getElementById("input_file").click()
                        }>
                        <RiPlayListAddLine
                            size={shrink.value ? "2rem" : "1.5rem"}
                        />
                        <span>Add Songs</span>
                    </li>
                </ul>
            </div>
            {/* <div class="nav" className="{ shrink: shrinkNavigation.shrink }">
                <a href="/" className="logo">MUSIKA</a>
                <input
                    type="file"
                    accept="audio/*"
                    hidden
                    multiple
                    onChange="handleChangeFiles" />
                <button className="closeButton" @click="handleClose">
                    <hamburger-button
                        :className="{ opened: shrinkNavigation.shrink }"></hamburger-button>
                </button>
                <ul>
                    <li className="ripple" @click="router.push('/playing')">
                        <v-icon name="bi-music-note-list" scale="1.5"></v-icon>
                        <span>Playing</span>
                    </li>
                    <li className="ripple active" @click="router.push('/')">
                        <v-icon name="gi-bookshelf" scale="1.5"></v-icon>
                        <span>Play List</span>
                    </li>
                    <li className="ripple" @click="handlePickFile">
                        <v-icon name="co-playlist-add" scale="1.5"></v-icon>
                        <span>Add Songs</span>
                    </li>
                </ul>
            </div> */}
        </>
    );
}
