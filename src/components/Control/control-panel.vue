<template>
    <div class="controls">
        <name-section></name-section>
        <control-section></control-section>
        <volume-section></volume-section>
    </div>
</template>
<script setup lang="ts">
import NameSection from "./name-section.vue";
import ControlSection from "./control-section.vue";
import VolumeSection from "./volume-section.vue";
</script>
<style lang="scss" scoped>
.controls {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: rgba(255, 255, 255, 0.151);
    backdrop-filter: blur(10px);
    transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 4;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
