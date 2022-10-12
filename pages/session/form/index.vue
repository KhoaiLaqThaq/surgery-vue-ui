<template>
    <div class="mt-3">
        <TitleHeader :title="title" />
        <SessionForm />
    </div>
</template>
<script setup>
import TitleHeader from '~~/components/common/TitleHeader.vue';
import SessionForm from '~~/components/form/SessionForm.vue';
const title = "Thêm mới phiên khám";

</script>
<style lang="scss">
    
</style>