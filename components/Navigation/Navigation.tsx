import { GiMusicalNotes, GiBookshelf } from "react-icons/gi";
import { RiPlayListAddLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";
import styles from "@styles/Navigation.module.scss";
import Hamburger from "./Hamburger";
import { useShrinkNavigation } from "@contexts/shrinkNavigation";
import type { IAudioMetadata } from "@ts/types";
import {
    extractThumbnailFromAudio,
    removeSiteFromTitle,
    _arrayBufferToBase64,
} from "@utils/utils";
import { useMusicStore } from "@contexts/MusicStore";
import { TagType } from "jsmediatags/types";
import { useLoading } from "@contexts/Loading";

export default function Navigation() {
    const shrink = useShrinkNavigation();
    const router = useRouter();
    const { setValue: setMusicStore } = useMusicStore();
    const { setValue: setLoading } = useLoading();

    const handleFiles = ({ target }) => {
        setLoading(true);
        for (let i = 0; i < target.files.length; i++) {
            const file: File = target.files[i];
            const disposableAudio = new Audio();

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
                onSuccess: async function (media: TagType) {
                    try {
                        let buffer = await file.arrayBuffer();
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
                            picture: extractThumbnailFromAudio(
                                media.tags.picture
                            ),
                            album: media.tags.album.trim() || "unknown",
                            format: file.type,
                            lyrics: "",
                            src: _arrayBufferToBase64(buffer, file.type),
                            duration: 0,
                        };
                        disposableAudio.src = res.src;
                        disposableAudio.onloadedmetadata = function () {
                            res["duration"] = Math.round(
                                disposableAudio.duration
                            );
                            setMusicStore(prev => {
                                return [...prev, res];
                            });
                            abort();
                        };
                    } catch (e) {
                        console.log(`error while uploading ${file.name}`, e);
                    }
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
                className={`${styles.nav} ${shrink.value ? styles.shrink : ""}`}
            >
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
                    }}
                >
                    <Hamburger />
                </button>

                <ul>
                    <li
                        className="ripple"
                        onClick={() => router.push("/playing")}
                    >
                        <GiMusicalNotes
                            size={shrink.value ? "2rem" : "1.5rem"}
                        />
                        <span>Playing</span>
                    </li>
                    <li
                        className="ripple active"
                        onClick={() => router.push("/")}
                    >
                        <GiBookshelf size={shrink.value ? "2rem" : "1.5rem"} />
                        <span>All Songs</span>
                    </li>
                    <li
                        className="ripple"
                        onClick={() =>
                            document.getElementById("input_file").click()
                        }
                    >
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
