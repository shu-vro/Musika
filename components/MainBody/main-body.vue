<script lang="ts" setup>
import { useShrinkNavigation } from "~/stores/shrinkNavigation";
import { useRippleRefresh } from "~/stores/rippleRefresh";
const shrinkNavigation = useShrinkNavigation();

onMounted(() => {
    useRippleRefresh().refresh();
});

defineProps({
    title: {
        type: String,
        default: "Main Body",
    },
});
</script>
<template>
    <div class="main-body" :class="{ shrink: shrinkNavigation.shrink }">
        <h1>{{ title }}</h1>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.main-body {
    $width: calc(100% - 202px);
    $height: calc(100% - 100px);
    position: fixed;
    right: 0;
    top: 0;
    width: $width;
    height: $height;
    background: rgba(0, 0, 0, 40%);
    backdrop-filter: blur(10px);
    transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    &.shrink {
        width: calc(100% - 62px);
    }

    h1 {
        text-align: center;
        font-size: 1.3rem;
    }
}

@media (max-width: 687px) {
    .main-body {
        width: 100% !important;
        height: calc(100% - 180px);
    }
}
</style>
