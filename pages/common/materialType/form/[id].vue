<template>
    <div class="mt-3">
        <MaterialTypeForm :id="materialTypeId" :materialType="materialType" />
    </div>
</template>
<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import MaterialTypeForm from '~~/components/form/MaterialTypeForm.vue';
import MaterialTypeService from '~~/services/model/materialType.service';

export default {
    components: {
        MaterialTypeForm
    },
    setup() {
        const route = useRoute();
        const materialTypeId = ref(route.params?.id);
        const materialType = ref({});

        function getMaterialTypeById() {
            if (materialTypeId.value) {
                MaterialTypeService.getById(materialTypeId.value)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        materialType.value = responseData;
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });
            }
        }

        return {
            materialTypeId,
            materialType,

            getMaterialTypeById
        }
    },
    created() {
        this.getMaterialTypeById();
    }
}
</script>
<style lang="">
    
</style>