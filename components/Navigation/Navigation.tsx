import React, { useEffect } from "react";
import { GiMusicalNotes, GiBookshelf } from "react-icons/gi";
import { RiPlayListAddLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 } from "uuid";
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";
import styles from "@styles/Navigation.module.scss";
import Hamburger from "./Hamburger";
import { useShrinkNavigation } from "@contexts/shrinkNavigation";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import type { IAudioMetadata } from "@ts/types";
import { extractThumbnailFromAudio, removeSiteFromTitle } from "@utils/utils";
import { useMusicStore } from "@contexts/MusicStore";
import { TagType } from "jsmediatags/types";
import { useLoading } from "@contexts/Loading";

export default function Navigation() {
    const shrink = useShrinkNavigation();
    const router = useRouter();
    const musicStore = useMusicStore();
    const { setValue: setLoading } = useLoading();

    // Ripple effect
    let rippleRefresh = useRippleRefresh();
    useEffect(() => {
        rippleRefresh.refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        rippleRefresh.refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicStore]);

    useEffect(() => {
        let ripples = rippleRefresh.value;
        function setSize(el: HTMLElement) {
            let parentWidth = el.getBoundingClientRect().width;
            let parentHeight = el.getBoundingClientRect().height;
            let size = Math.hypot(parentWidth, parentHeight) * 2;
            el.style.setProperty("--size", size + "px");
        }
        ripples.forEach(r => {
            setSize(r);
            r.addEventListener("mousemove", (e: MouseEvent) => {
                setSize(r);
                let parentX = r.getBoundingClientRect().x;
                let parentY = r.getBoundingClientRect().y;
                let x = e.clientX - parentX;
                let y = e.clientY - parentY;
                r.style.setProperty("--x", x + "px");
                r.style.setProperty("--y", y + "px");
            });

            r.addEventListener("click", (e: MouseEvent) => {
                let parentX = r.getBoundingClientRect().x;
                let parentY = r.getBoundingClientRect().y;
                let x = e.clientX - parentX;
                let y = e.clientY - parentY;
                r.style.setProperty("--x", x + "px");
                r.style.setProperty("--y", y + "px");
                r.classList.add("ripple-effect");

                setTimeout(() => {
                    r.classList.remove("ripple-effect");
                }, 500);
            });
        });
    }, [rippleRefresh.value]);

    const handleFiles = ({ target }) => {
        setLoading(true);
        for (let i = 0; i < target.files.length; i++) {
            const file: File = target.files[i];
            const disposableAudio = document?.createElement("audio");

            /**
             * Aborts the process on specific condition
             *
             * If element is in last position, then stop loading.
             */
            const abort = () => {
                if (i === target.files.length - 1) {
                    setLoading(false);
                }
            };
            if (!file.type.match(/^audio\//)) {
                abort();
                continue;
            }
            jsmediatags.read(file, {
                onSuccess: function (media: TagType) {
                    let res: IAudioMetadata = {
                        id: v4(),
                        trackName: removeSiteFromTitle(
                            media.tags.title.trim() || file.name
                        ),
                        artist: media.tags.artist.trim() || "unknown",
                        loved: false,
                        genre: media.tags.genre.trim() || "unknown",
                        path: "App Cache",
                        size: file.size,
                        picture: extractThumbnailFromAudio(media.tags.picture),
                        album: media.tags.album.trim() || "unknown",
                        format: file.type,
                        lyrics: "",
                        src: "",
                        duration: 0,
                    };
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        res["src"] = e.target.result;
                        disposableAudio.src = e.target.result as string;
                        disposableAudio.onloadedmetadata = function () {
                            res["duration"] = Math.round(
                                disposableAudio.duration
                            );
                            musicStore.setValue(prev => {
                                return [...prev, res];
                            });
                            disposableAudio.remove();
                            abort();
                        };
                    };
                    reader.onerror = function (e) {
                        console.warn(e);
                        abort();
                    };
                    reader.readAsDataURL(file);
                },
                onError: function (e) {
                    console.warn(e);
                    abort();
                },
            });
        }
    };

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
                    onChange={handleFiles}
                />
                <button
                    className={styles.closeButton}
                    onClick={() => {
                        shrink.setValue(!shrink.value);
                    }}>
                    <Hamburger />
                </button>

                <ul>
                    <li
                        className="ripple"
                        onClick={() => router.push("/playing")}>
                        <GiMusicalNotes
                            size={shrink.value ? "2rem" : "1.5rem"}
                        />
                        <span>Playing</span>
                    </li>
                    <li
                        className="ripple active"
                        onClick={() => router.push("/")}>
                        <GiBookshelf size={shrink.value ? "2rem" : "1.5rem"} />
                        <span>All Songs</span>
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
        </>
    );
}
