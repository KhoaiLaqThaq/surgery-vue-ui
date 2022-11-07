<template>
    <div>
        {{ post.id }} _ {{ post.title }}
    </div>
</template>
<script setup>

const post = defineProps({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});
</script>
<style lang="scss">
    
</style>