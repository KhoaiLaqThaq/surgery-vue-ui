<template>
    <div class="mt-3">
        <TitleHeader :about="title" />
        <MaterialBatchForm :id="materialBatchId" :materialBatch="materialBatch" />
    </div>
</template>
<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import MaterialBatchService from '~~/services/model/materialBatch.service';
import MaterialBatchForm from '~~/components/form/MaterialBatchForm.vue';
import TitleHeader from '~~/components/common/TitleHeader.vue';

export default {
    components: { MaterialBatchForm, TitleHeader },
    setup() {
        const {$showToast} = useNuxtApp();
        const route = useRoute();
        const materialBatchId = ref(route.params?.id);
        const materialBatch = ref({});

        const getMaterialBatchById = () => {
            if (materialBatchId.value) {
                MaterialBatchService.getById(materialBatchId.value)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        materialBatch.value = responseData;
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    $showToast("Tải thông tin lô vật tư không thành công!", "error", 2000);
                })
            }
        }

        return {
            title: "Cập nhật lô vật tư",
            materialBatchId,
            materialBatch,

            getMaterialBatchById
        }
    },
    created() {
        this.getMaterialBatchById();
    }
}
</script>
<style lang="scss">
    
</style>