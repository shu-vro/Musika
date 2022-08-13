<template>
    <div class="controls">
        <control-name-section />
        <control-section />
        <control-volume-section />
    </div>
</template>
<script setup lang="ts">
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

@media (max-width: 687px) {
    .controls {
        bottom: 80px;
    }

    div.name-section {
        display: none;
    }
}
</style>
