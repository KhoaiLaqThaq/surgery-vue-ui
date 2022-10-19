<template>
    <div class="mt-3 row">
        <Select2 class="col-4 mb-3" :title="'Tên vật tư'" :items="materials"
            @change-value="listenerChangedValue($event)"
            @set-item-active="setItemActive($event)"
        />
    </div>
</template>
<script>
import { ref, watch } from 'vue';

import Select2 from '~~/components/common/Select2.vue';

import MaterialService from '~~/services/model/material.service';

export default {
    components: { Select2 },
    setup() {
        const materialName = ref('');
        const materials = ref({});

        watch([materialName], () => onLoadMaterialsByName());

        function onLoadMaterialsByName() {
            if (materialName.value && materialName.value.length > 0) {
                resetDataSelect2();
                MaterialService.searchMaterialsByName({name: materialName.value})
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        console.log("responseData: ", responseData);
                        materials.value = responseData;
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                })
            } else {
                materials.value = {};
            }
        }

        function listenerChangedValue(e) {
            console.log("Listener changed value: ", e);
            materialName.value = e;
        }

        function setItemActive(e) {
            console.log("Set item active: ", e);
            materials.value = {};
        }

        const resetDataSelect2 = () => materials.value = {};

        return {
            materials,

            setItemActive,
            listenerChangedValue
        }
    }
}
</script>
<style lang="">
    
</style>