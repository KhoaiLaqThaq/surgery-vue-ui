<template>
    <div class="mt-3">
        <TitleHeader :title="title" />
        <MaterialForm />
    </div>
</template>
<script setup>
import MaterialForm from "~~/components/form/MaterialForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";

const title = "Thêm mới vật tư";
</script>
<style lang="scss">
    
</style>