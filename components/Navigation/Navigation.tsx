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
import Link from "next/link";

export default function Navigation() {
    const shrink = useShrinkNavigation();
    const router = useRouter();
    const { setValue: setMusicStore } = useMusicStore();
    const { setValue: setLoading } = useLoading();

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        for (let i = 0; i < e.target.files.length; i++) {
            const file: File = e.target.files[i];
            const disposableAudio = new Audio();

            /**
             * Aborts the process on specific condition
             *
             * If element is in last position, then stop loading.
             */
            const abort = () => {
                if (i === e.target.files.length - 1) {
                    setLoading(false);
                }
            };
            if (!file.type.match(/^audio\//)) {
                abort();
                continue;
            }
            file.arrayBuffer()
                .then(buffer => {
                    function getDuration(src: string) {
                        disposableAudio.src = src;
                        disposableAudio.onloadedmetadata = function () {
                            res["duration"] = Math.round(
                                disposableAudio.duration
                            );
                            setMusicStore(prev => {
                                return [...prev, res];
                            });
                            abort();
                        };
                    }
                    let res: IAudioMetadata = {
                        id: v4(),
                        trackName: file.name,
                        artist: "unknown",
                        loved: false,
                        genre: "unknown",
                        path: "App Cache",
                        size: file.size,
                        picture: {},
                        album: "unknown",
                        format: file.type,
                        lyrics: "",
                        src: _arrayBufferToBase64(buffer, file.type),
                        duration: 0,
                    };
                    jsmediatags.read(file, {
                        onSuccess: function (media: TagType) {
                            res.trackName = removeSiteFromTitle(
                                media.tags?.title
                                    ? media.tags.title.trim()
                                    : file.name
                            );
                            res.artist = media.tags?.title
                                ? media.tags.artist.trim()
                                : "unknown";
                            res.album = media.tags?.title
                                ? media.tags.album.trim()
                                : "unknown";
                            res.genre = media.tags?.title
                                ? media.tags.genre.trim()
                                : "unknown";
                            res.picture = extractThumbnailFromAudio(
                                media.tags.picture
                            );
                            getDuration(res.src);
                        },
                        onError: function (e) {
                            console.warn(e);
                            getDuration(res.src);
                        },
                    });
                })
                .catch(e => {
                    alert(`failed to upload file ${file.name}`);
                    console.log(`failed to upload file ${file.name}`, e);
                    abort();
                });
        }
    };

    return (
        <>
            <div
                className={`${styles.nav} ${shrink.value ? styles.shrink : ""}`}
            >
                <Link href="/" passHref>
                    <a className={styles.logo}>MUSIKA</a>
                </Link>
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
