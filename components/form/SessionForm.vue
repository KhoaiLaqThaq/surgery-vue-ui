<template>
    <Form @submit="onSubmit()">
        
    </Form>
</template>
<script>
import { ref, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import BaseButton from '~~/components/common/BaseButton.vue';
import {validateRequired, validateSelect} from '~~/services/common.js';

export default {
    setup() {

        function onSubmit() {
            
        }
        
        return {
            onSubmit
        }
    }
}
</script>
<style lang="scss">
    
</style>