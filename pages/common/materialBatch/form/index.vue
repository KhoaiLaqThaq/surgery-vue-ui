<template>
    <div class="mt-3">
        <TitleHeader :title="title" />
        <MaterialBatchForm />
    </div>
</template>
<script>
import { ref, reactive } from "vue";

import MaterialBatchForm from "~~/components/form/MaterialBatchForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";

export default {
    components: {
        MaterialBatchForm,
        TitleHeader
    },
    data() {
        return {
            title: 'Thêm mới lô vật tư'
        }
    }
}
</script>
<style lang="scss">
    
</style>