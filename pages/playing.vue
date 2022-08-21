<script lang="ts" setup>
import { useShrinkNavigation } from "~/stores/shrinkNavigation";
const shrinkNavigation = useShrinkNavigation();
definePageMeta({
    pageTransition: {
        mode: "in-out",
        name: "page",
    },
});
</script>
<template>
    <main-body title="Playing"></main-body>
</template>
