import { useEffect } from "react";
import { openDB } from "idb";
import { useMusicStore } from "@contexts/MusicStore";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import { arraysEqual, object_equals } from "@utils/utils";
import { useSelectMusic } from "@contexts/SelectMusic";

export default function ConfigHelperComponent() {
    const {
        value: musicStore,
        setValue: setMusicStore,
        queue,
        setQueue,
        getFromMultipleIds,
    } = useMusicStore();
    const { value: selectedMusic, setValue: setSelectedMusic } =
        useSelectMusic();

    // RIPPLE REFRESH
    let rippleRefresh = useRippleRefresh();
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

    // MUSIC STORE BACKUP: FOR MUSICsTORE
    useEffect(() => {
        (async () => {
            try {
                const db = await openDB("MUSIC_STORE_DB", 1, {
                    upgrade(database, oldVersion, newVersion, transaction) {
                        database.createObjectStore("music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        database.createObjectStore("queue_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        database.createObjectStore("selected_music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                    },
                });
                if (!db.objectStoreNames.contains("music_store")) return;
                if (musicStore.length !== 0) {
                    // SET TO DB
                    await db.clear("music_store");
                    musicStore.forEach(async track => {
                        await db.put("music_store", track);
                    });
                    return;
                }
                // GET FROM DB
                const values = await db.getAll("music_store");
                if (values.length === 0) return;
                if (arraysEqual(musicStore, values)) return;
                setMusicStore(values);
            } catch (e) {
                console.log(e);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicStore]);

    // MUSIC STORE BACKUP: FOR QUEUE
    useEffect(() => {
        (async () => {
            try {
                const db = await openDB("MUSIC_STORE_DB", 1, {
                    upgrade(database, oldVersion, newVersion, transaction) {
                        database.createObjectStore("music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        database.createObjectStore("queue_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        database.createObjectStore("selected_music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                    },
                });
                if (!db.objectStoreNames.contains("queue_store")) return;
                if (queue.length !== 0) {
                    // SET TO DB
                    await db.clear("queue_store");
                    queue.forEach(async track => {
                        await db.put("queue_store", { id: track.id });
                    });
                    return;
                }
                // GET FROM DB
                const values = await db.getAllKeys("queue_store");
                if (values.length === 0) return;
                const parsedQueues = getFromMultipleIds(values);
                if (arraysEqual(queue, parsedQueues)) return;
                setQueue(parsedQueues);
            } catch (e) {
                console.log(e);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queue, musicStore]);

    // SELECTED MUSIC BACKUP
    useEffect(() => {
        (async () => {
            try {
                const db = await openDB("MUSIC_STORE_DB", 1, {
                    upgrade(database, oldVersion, newVersion, transaction) {
                        database.createObjectStore("music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        database.createObjectStore("queue_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                        database.createObjectStore("selected_music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                    },
                });
                if (!db.objectStoreNames.contains("selected_music_store"))
                    return;
                if (selectedMusic) {
                    // SET TO DATABASE
                    await db.clear("selected_music_store");
                    await db.put("selected_music_store", {
                        id: selectedMusic.id,
                    });
                    return;
                }
                // GET FROM DATABASE
                const values = await db.getAllKeys("selected_music_store");
                if (values.length === 0) return;
                const [parsedTrack] = getFromMultipleIds(values);
                if (object_equals(selectedMusic, parsedTrack)) return;
                setSelectedMusic(parsedTrack);
            } catch (e) {
                console.log(e);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMusic, musicStore]);

    return <></>;
}
