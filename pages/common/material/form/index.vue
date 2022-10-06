<template>
    <div class="mt-3">
        <MaterialForm :id="materialId" />
    </div>
</template>
<script>
import {ref} from 'vue';
import { useRoute } from 'vue-router';

import MaterialService from '~~/services/model/material.service';
import MaterialForm from '~~/components/form/MaterialForm.vue';

export default {
    components: {
        MaterialForm
    },
    setup() {
        const route = useRoute();
        const materialId = ref(route.params && route.params.id);
        const material = ref({});

        function getMaterialById() {
            if (materialId.value) {
                MaterialService.getById(materialId.value)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) material.value = responseData;
                })
                .catch((error) => {

                    console.log("Error: ", error);
                });
            }
        }
        

        return {
            materialId,
            material,

            getMaterialById
        }
    },
    created() {
        this.getMaterialById();
    }
}
</script>
<style lang="scss">
    
</style>