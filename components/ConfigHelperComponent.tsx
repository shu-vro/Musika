import { useEffect } from "react";
import { openDB } from "idb";
import { useMusicStore } from "@contexts/MusicStore";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import { arraysEqual, object_equals } from "@utils/utils";
import { useSelectMusic } from "@contexts/SelectMusic";
import { useLoading } from "@contexts/Loading";

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
    const { setValue: setLoading } = useLoading();

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
                setLoading(true);
                const db = await openDB("MUSIC_STORE_DB", 1, {
                    upgrade(database, oldVersion, newVersion, transaction) {
                        database.createObjectStore("music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                    },
                });

                if (musicStore.length !== 0) {
                    // SET TO DB
                    db.clear("music_store");
                    musicStore.forEach(track => {
                        db.put("music_store", track);
                    });
                    return setLoading(false);
                }
                // GET FROM DB
                const values = await db.getAll("music_store");
                if (values.length === 0) return setLoading(false);
                if (arraysEqual(musicStore, values)) return setLoading(false);
                setMusicStore(values);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicStore]);

    // MUSIC STORE BACKUP: FOR QUEUE
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const db = await openDB("QUEUE_STORE_DB", 1, {
                    upgrade(database, oldVersion, newVersion, transaction) {
                        database.createObjectStore("queue_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                    },
                });
                if (queue.length !== 0) {
                    // SET TO DB
                    db.clear("queue_store");
                    queue.forEach(track => {
                        db.put("queue_store", { id: track.id });
                    });
                    return setLoading(false);
                }
                // GET FROM DB
                const values = await db.getAllKeys("queue_store");
                if (values.length === 0) return setLoading(false);
                const parsedQueues = getFromMultipleIds(values);
                if (arraysEqual(queue, parsedQueues)) return setLoading(false);
                setQueue(parsedQueues);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queue, musicStore]);

    // SELECTED MUSIC BACKUP
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const db = await openDB("SELECTED_MUSIC_STORE_DB", 1, {
                    upgrade(database, oldVersion, newVersion, transaction) {
                        database.createObjectStore("selected_music_store", {
                            keyPath: "id",
                            autoIncrement: true,
                        });
                    },
                });
                if (selectedMusic) {
                    // SET TO DATABASE
                    db.clear("selected_music_store");
                    db.put("selected_music_store", { id: selectedMusic.id });
                    return setLoading(false);
                }
                // GET FROM DATABASE
                const values = await db.getAllKeys("selected_music_store");
                if (values.length === 0) return setLoading(false);
                const [parsedTrack] = getFromMultipleIds(values);
                console.log(parsedTrack, values, musicStore);
                if (object_equals(selectedMusic, parsedTrack))
                    return setLoading(false);
                setSelectedMusic(parsedTrack);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMusic, musicStore]);

    return <></>;
}
