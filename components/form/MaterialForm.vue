<template>
    <Form @submit.prevent="onSubmit()">
        <div class="row mb-3">
            <!-- code -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box mb-3" v-model="material.code" name="code" :rules="validateRequired"/>
                    <ErrorMessage name="code" class="text-danger" />
                    <label for="">Mã vật tư <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /code -->

            <!-- name -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control mb-3" v-model="material.name" name="name" :rules="validateRequired"/>
                    <ErrorMessage name="name" class="text-danger"/>
                    <label for="">Tên vật tư <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /name -->

            <!-- materialType -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field as="select" name="materialType" v-model="materialTypeId" class="form-select box" required="required" :value="materialTypeId" :rules="validateSelect">
                        <option v-for="(materialType, index) in materialTypeList" :key="index" :value="materialType.id">{{materialType.name}}</option>
                    </Field>
                </div>
            </div>
            <!-- /materialType -->

            <!-- composition -->
            <div class="col-12 mb-3">
                <textarea class="form-control" id="composition" v-model="material.composition" rowspan="5"></textarea>
                <label for="composition">Thành phần <span class="text-danger">*</span></label>
            </div>
            <!-- /composition -->

            <!-- suggest -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <input type="text" class="form-control mb-3" v-model="material.suggest" id="suggest" />
                    <label for="suggest">Tên gợi ý</label>
                </div>
            </div>
            <!-- /suggest -->

            <!-- total -->
            <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="form-floating">
                    <input type="text" class="form-control mb-3" :value="material.total" id="total" :disabled="true" />
                    <label for="total">Số lượng</label>
                </div>
            </div>
            <!-- /total -->

            <!-- price -->
            <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="form-floating">
                    <Field type="text" class="form-control mb-3" v-model="material.price" name="price" :rules="validateRequired" />
                    <ErrorMessage name="price" class="text-danger" />
                    <label for="price">Giá mua <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /price -->

            <!-- sales -->
            <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="form-floating">
                    <Field type="text" class="form-control mb-3" v-model="material.sales" name="sales" :rules="validateRequired" />
                    <ErrorMessage name="sales" class="text-danger" />
                    <label for="sales">Giá bán <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /sales -->
        </div>
    </Form>
</template>
<script>
import { ref, reactive } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import MaterialService from '~~/services/model/material.service';
import MaterialTypeService from '~~/services/model/materialType.service';

import { Message } from '~~/lang/message.js'

export default {
    props: ["id", "material"],
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup(props) {
        const {$showToast} = useNuxtApp();
        const materialId = ref(props.id);
        const materialExist = ref(props.material);
        const material = reactive({
            code: '',
            name: '',
            composition: '',
            suggest: '',
            total: 0,
            unit: '',
            price: 0,
            sales: 0
        });
        const materialTypeList = ref([]);
        const materialTypeId = ref("");

        // ---------------------- START set state data --------------------
        function setMaterial() {
            if (materialExist.value) {
                material.code = materialExist.code;
                material.name = materialExist.name;
                material.composition = materialExist.composition;
                material.suggest = materialExist.suggest;
                material.total = materialExist.total;
                material.unit = materialExist.unit;
                material.price = materialExist.price;
                material.sales = materialExist.sales;
                materialTypeId.value = materialExist.materialType?.id;
            }
        }

        // ---------------------- END set state data --------------------

        // ---------------------- START Validation ------------------------
        function validateRequired(value) {
            if (!value) return Message.required;
            if (value.trim().length() < 3) return Message.minLength;
            return true;
        }

        function validateSelect(value) {
            if (!value) return Message.required;
            return true;
        }
        // ---------------------- END Validation ------------------------

        // ---------------------- CALL API --------------------------
        function getAllMaterialTypes() {
            MaterialTypeService.getALl()
            .then((response) => {
                let responseData = response.data;
                if (responseData) materialTypeList.value = responseData;
            })
            .catch((error) => {
                $showToast("Tải danh sách loại vật tư không thành công!", "error", 2000);
                console.log("Error: ", error);
            });
        }


        function onSubmit() {
            console.log("onSubmit");

            // TODO: format data
            let materialData = {
                code: material.code,
                name: material.name,
                composition: material.composition,
                suggest: material.suggest,
                total: material.total,
                price: material.price,
                sales: material.sales,
                materialType: {
                    id: materialTypeId.value
                }
            };

            MaterialService.saveOrUpdate(materialData)
            .then((response) => {
                let responseData = response.data();
                if (responseData) {
                    console.log("responseData: ", responseData);
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        }

        return {
            material,
            materialTypeList,

            onSubmit,
            setMaterial,
            validateSelect,
            validateRequired,
            getAllMaterialTypes
        }
    },
    created() {
        this.setMaterial();
        this.getAllMaterialTypes();
    }
}
</script>
<style lang="scss">
    
</style>
