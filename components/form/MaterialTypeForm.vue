<template>
    <Form @submit.prevent="onSubmit()">
        <div class="row mb-3">
            <!-- code -->
            <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="form-floating">
                    <Field type="text" class="form-control box mb-3" v-model="materialType.code" required="required" name="code" :rules="validateRequired" :disabled="materialTypeId" />
                    <ErrorMessage name="code" class="text-danger" />
                    <label for="">Mã loại vật tư</label>
                </div>
            </div>
            <!-- /code -->
            <!-- name -->
            <div class="col-lg-8 col-md-6 col-xs-12">
                <div class="form-floating">
                    <Field type="text" class="form-control box mb-3" v-model="materialType.name" required="required" name="name" :rules="validateRequired" />
                    <ErrorMessage name="name" class="text-danger" />
                    <label for="">Tên loại vật tư <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /name -->
        </div>
        <div class="row pb-0">
            <div class="col-12 text-right">
                <BaseButton class="btn-primary ms-auto" :btnType="'submit'" :name="'Lưu'" :textSize="'text-small'" />
            </div>
        </div>
    </Form>
</template>
<script>
import { ref, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import { Message } from '~~/lang/message.js'
import MaterialTypeService from '~~/services/model/materialType.service';
import BaseButton from '../common/BaseButton.vue';

export default {
    props: ["id", "materialType"],
    components: {
        Form,
        Field,
        ErrorMessage,
        BaseButton
    },
    setup(props) {
        const { $showToast } = useNuxtApp();
        const materialTypeId = ref(props.id);
        const materialType = reactive({
            code: '',
            name: ''
        });

        watch(props, () => {
            setMaterialType();
        });

        function setMaterialType() {
            let materialTypeExisted = props.materialType;
            if (materialTypeExisted) {
                materialType.code = materialTypeExisted.code;
                materialType.name = materialTypeExisted.name;
            }
        }

        function validateRequired(value) {
            if (!value) return Message.required;
            if (value.trim().length < 3) return Message.minLength;
            return true;
        }

        function onSubmit() {
            let materialTypeData = {
                id: materialTypeId,
                code: materialType.code,
                name: materialType.name
            };
            MaterialTypeService.saveOrUpdate(materialTypeData)
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    $showToast("Lưu loại vật tư thành công!", "success", 2000);
                    navigateTo("/common/materialType");
                }
            })
            .catch((error) => {
                $showToast("Lưu loại vật tư không thành công!", "error", 2000);
                console.log("Error: ", error);
            });
        }

        return {
            materialTypeId,
            materialType,

            onSubmit,
            validateRequired,
            setMaterialType
        }
    }
}
</script>
<style lang="scss">
    
</style>