<template>
    <NavBar />
    <PagiNation />
    <MainBody />
</template>

<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import PagiNation from "@/components/PagiNation.vue";
import MainBody from "@/components/MainBody.vue";
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
    font-family: "Montserrat", "Gill Sans", "Gill Sans MT", Calibri,
        "Trebuchet MS", sans-serif;
}
</style>
