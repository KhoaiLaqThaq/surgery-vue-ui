<template>
    <div>
        
    </div>
</template>
<script>
import { ref, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import { Message } from '~~/lang/message.js'
import BaseButton from '~~/components/common/BaseButton.vue';
import {validateRequired, validateSelect} from '~~/services/common.js';

export default {
    props:["id", "materialBatch"],
    components: {BaseButton, Form, Field, ErrorMessage },
    setup(props) {
        const {$showToast} = useNuxtApp();
        const materialBatchId = ref(props.id);
        const materialBatchExist = ref(props.materialBatch);
        const materialBatch = reactive({
            code: '',
            materialId: '',
            materialName: '',
            unit: '',
            amount: 0,
            receiptDate: '',
            expiredDate: '',
            price: 0
        });
        const materials = ref([]);

        watch(props, () => {
            setMaterialBatch();
        });

        // ---------------------- START set state data --------------------
        function setMaterialBatch() {
            let materialBatchExisted = materialBatchExist.value;
            if (materialBatchExisted) {
                materialBatch.code = materialBatchExisted.code;
                materialBatch.materialId = materialBatchExisted.material?.id;
                materialBatch.materialName = materialBatchExisted.material?.name;
                materialBatch.unit = materialBatchExisted.unit;
                materialBatch.amount = materialBatchExisted.amount;
                materialBatch.receiptDate = materialBatchExisted.receiptDate;
                materialBatch.expiredDate = materialBatchExisted.expiredDate;
                materialBatch.price = materialBatchExisted.price;
            }
        }
        // ---------------------- END set state data --------------------

        return {
            validateSelect, validateRequired,
            
        }
    }
}
</script>
<style lang="scss">
    
</style>