<template>
    <Head>
        <Title> MUSIKA - Music for everyone </Title>
        <Meta
            name="description"
            content="MUSIKA is a music player that allows you to play music for everyone." />
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
            let span = document.createElement("span");
            span.classList.add("ripple-effect");
            r.appendChild(span);

            setTimeout(() => {
                span.remove();
            }, 500);
        });
    });
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    background: url("./assets/bg.jpg") no-repeat center center fixed;
    background-size: cover;
    --theme: dodgerblue;
    --color: #f2f4f7;
    color: var(--color);
    accent-color: var(--theme);
}

.ripple {
    overflow: hidden;
    position: relative;

    &::before {
        $seconds: 0.25s;
        content: "";
        position: absolute;
        top: var(--y);
        left: var(--x);
        transform: translate(-50%, -50%);
        border-radius: 50%;
        width: 0;
        height: 0;
        background: rgba($color: #ffffff, $alpha: 0.2);
        z-index: -1;
        transition: width $seconds ease-out, height $seconds ease-out;
    }

    &:hover::before {
        width: var(--size);
        height: var(--size);
    }

    .ripple-effect {
        position: absolute;
        top: var(--y);
        left: var(--x);
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba($color: #ffffff, $alpha: 0.5);
        animation: ripple 500ms linear 0s 1 forwards;

        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }

            50% {
                width: var(--size);
                height: var(--size);
                opacity: 0.5;
            }

            100% {
                width: var(--size);
                height: var(--size);
                opacity: 0;
            }
        }
    }
}

button {
    cursor: pointer;
    background: none;
    color: inherit;
    border: none;
}

a {
    text-decoration: none;
    color: inherit;
}

.page-enter-active,
.page-leave-active {
    transition: opacity 0.5s ease;
}

.page-enter-from {
    opacity: 0;
    transform: scale(1.5);
}
.page-leave-to {
    opacity: 0;
    transform: scale(0.5);
}
</style>
