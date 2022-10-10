<template>
    <Form @submit.prevent="onSubmit()">
        <div class="row mb-3">
            <!-- code -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="material.code" name="code" :rules="validateRequired"/>
                    <ErrorMessage name="code" class="text-danger" />
                    <label for="">Mã vật tư <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /code -->

            <!-- name -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none" v-model="material.name" name="name" :rules="validateRequired"/>
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
                    <ErrorMessage name="materialType" class="text-danger" />
                    <label for="">Loại vật tư <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /materialType -->

            <!-- composition -->
            <div class="col-12 mb-3">
                <div class="form-floating">
                    <textarea class="form-control box border-none minH-100" id="composition" v-model="material.composition"></textarea>
                    <label for="composition">Thành phần <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /composition -->

            <!-- suggest -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <input type="text" class="form-control box border-none mb-3" v-model="material.suggest" id="suggest" />
                    <label for="suggest">Tên gợi ý</label>
                </div>
            </div>
            <!-- /suggest -->

            <!-- total -->
            <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="form-floating">
                    <input type="text" class="form-control box mb-3" :value="material.total" id="total" :disabled="true" />
                    <label for="total">Số lượng</label>
                </div>
            </div>
            <!-- /total -->

            <!-- price -->
            <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none mb-3" v-model="material.price" name="price" :rules="validateRequired" />
                    <ErrorMessage name="price" class="text-danger" />
                    <label for="price">Giá mua <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /price -->

            <!-- sales -->
            <div class="col-lg-4 col-md-6 col-xs-12">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none mb-3" v-model="material.sales" name="sales" :rules="validateRequired" />
                    <ErrorMessage name="sales" class="text-danger" />
                    <label for="sales">Giá bán <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /sales -->
        </div>
        <hr />
        <div class="row pb-0">
            <div class="col-12 text-right">
                <BaseButton class="btn-primary box ms-auto" :btnType="'submit'" :name="'Lưu'" :textSize="'text-small'" />
            </div>
        </div>
    </Form>
</template>
<script>
import { ref, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import MaterialService from '~~/services/model/material.service';
import MaterialTypeService from '~~/services/model/materialType.service';
import BaseButton from '~~/components/common/BaseButton.vue';
import {validateRequired, validateSelect} from '~~/services/common.js';

export default {
    props: ["id", "material"],
    components: {
        Form,
        Field,
        ErrorMessage,
        BaseButton
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

        watch(props, () => {
            setMaterial();
        });

        // ---------------------- START set state data --------------------
        function setMaterial() {
            let materialExisted = materialExist.value;
            if (materialExisted) {
                material.code = materialExisted.code;
                material.name = materialExisted.name;
                material.composition = materialExisted.composition;
                material.suggest = materialExisted.suggest;
                material.total = materialExisted.total;
                material.unit = materialExisted.unit;
                material.price = materialExisted.price;
                material.sales = materialExisted.sales;
                materialTypeId.value = materialExisted.materialType?.id;
            }
        }

        // ---------------------- END set state data --------------------

        // ---------------------- CALL API --------------------------
        function getAllMaterialTypes() {
            MaterialTypeService.getAll()
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
                id: materialId.value,
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
            materialTypeId,
            materialTypeList,

            onSubmit,
            setMaterial,
            validateSelect,
            validateRequired,
            getAllMaterialTypes
        }
    },
    created() {
        this.getAllMaterialTypes();
    }
}
</script>
<style lang="scss">
    
</style>
