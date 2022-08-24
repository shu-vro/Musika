<template>
    <Head>
        <Title> MUSIKA - Music for everyone </Title>
        <Meta
            name="description"
            content="MUSIKA is a music player that allows you to play music for everyone." />
        <Meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
        <Meta charset="utf-8" />
        <Link rel="icon" type="image/ico" href="/favicon.ico" />
    </Head>
    <navigation-panel />
    <control-panel />
    <nuxt-page />
</template>

<script lang="ts" setup>
import { useRippleRefresh } from "~/stores/rippleRefresh";
let rippleRefresh = useRippleRefresh();
onMounted(() => {
    setTimeout(() => {
        rippleRefresh.refresh();
    }, 1000);
});

rippleRefresh.$subscribe(() => {
    let ripples = rippleRefresh.ripples;
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

        r.addEventListener("mousedown", (e: MouseEvent) => {
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
});
</script>
