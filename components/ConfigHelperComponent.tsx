import { useMusicStore } from "@contexts/MusicStore";
import { useRippleRefresh } from "@contexts/RippleRefresh";
import { arraysEqual } from "@utils/utils";
import { openDB } from "idb";
import React, { useEffect } from "react";

export default function ConfigHelperComponent() {
    const { value: musicStore, setValue: setMusicStore } = useMusicStore();

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

    // MUSIC STORE BACKUP
    useEffect(() => {
        if (!window || !document) return;
        (async () => {
            const db = await openDB("MUSIC_STORE_DB", undefined, {
                upgrade(database, oldVersion, newVersion, transaction) {
                    database.createObjectStore("music_store", {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                },
            });

            musicStore.forEach(track => {
                db.put("music_store", track);
            });
            const values = await db.getAll("music_store");
            if (values.length === 0) return;
            if (arraysEqual(musicStore, values)) return;
            setMusicStore(values);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicStore]);
    return <></>;
}
