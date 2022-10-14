<template>
    <Form @submit="onSubmit()">
        <div class="row mb-3">
            <!-- code -->
            <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="form-floating mb-3 box-floating">
                    <Field 
                        type="text" class="form-control" v-model="materialBatch.code" 
                        required="required" name="code" :disabled="materialBatchId"
                    />
                    <span class="btn-floating" @click="generateCode()" v-if="!materialBatchId">Auto</span>
                    <label for="code">Mã lô vật tư</label>
                </div>
            </div>
            <!-- /code -->
            <!-- materialName -->
            <div class="col-lg-3 col-md-6 col-xs-12" id="suggest__container">
                <div class="form-floating mb-3">
                    <Field
                        type="text" class="form-control" v-model="materialBatch.materialName" 
                        required="required" name="materialName"
                        @input="searchMaterialsByName()"
                        id="materialName"
                    />
                    <ErrorMessage name="materialName" class="text-danger" />
                    <p class="text-danger mt-2">{{notiByName}}</p>
                    <label for="materialName">Tên vật tư <span class="text-danger">*</span></label>
                </div>
                <div class="suggest__list d-none" id="suggest__list">
                    <ul class="p-0 auto-scroll-y">
                        <li class="suggest__item" v-for="(item, index) in materials" 
                            :key="index" @click="setMaterialChoose(item)" :title="item.name"
                        >{{ displayAmountCharacters(25, item.name) }}</li>
                    </ul>
                </div>
            </div>
            <!-- /materialName -->
            <!-- amount -->
            <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="form-floating mb-3">
                    <Field
                        type="text" class="form-control" v-model="materialBatch.amount"
                        required="required" name="amount"
                    />
                    <ErrorMessage name="amount" class="text-danger" />
                    <label class="amount">Số lượng <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /amount -->
            <!-- unit -->
            <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="form-floating mb-3">
                    <Field
                        type="text" class="form-control" v-model="materialBatch.unit"
                        required="required" name="unit"
                    />
                    <ErrorMessage name="unit" class="text-danger" />
                    <label for="unit">Đơn vị <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /unit -->
        </div>

        <div class="row mb-3">
            <!-- materialType -->
            <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="form-floating">
                    <Field as="select" name="materialType" v-model="materialBatch.materialTypeId" class="form-select box" required="required" :value="materialBatch.materialTypeId" :rules="validateSelect">
                        <option v-for="(materialType, index) in materialTypes" :key="index" :value="materialType.id">{{materialType.name}}</option>
                    </Field>
                    <ErrorMessage name="materialType" class="text-danger" />
                    <label for="">Loại vật tư <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /materialType -->
            <!-- price -->
            <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="form-floating mb-3">
                    <Field type="text" class="form-control" v-model="materialBatch.price"
                        required="required" name="price" :rules="validateRequired"
                    />
                    <ErrorMessage name="price" class="text-danger" />
                    <label for="price">Giá nhập <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /price -->
            <!-- expiredDate -->
            <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="form-floating mb-3">
                    <datepicker-lite class="form-control picker-date" :class-attr="'border-none'"
                        :name-attr="materialBatch.displayExpiredDate"
                        :show-bottom-button="true" :value-attr="materialBatch.displayExpiredDate" :locale="locale"
                        @value-changed="setExpiredDate"
                    />
                    <label>Ngày hết hạn</label>
                </div>
            </div>
            <!-- /expiredDate -->
        </div>
        <hr>
        <div class="row ms-auto">
            <div class="col-6">
                <BackButton class="btn-primary box ms-auto" :btnType="'button'" :name="'Quay lại'" :textSize="'text-small'" :routePush="'/common/materialBatch'"/>
            </div>
            <div class="col-6 text-right">
                <button type="submit" class="btn btn-primary text-small">Lưu</button>
            </div>
        </div>
    </Form>
</template>
<script>
import { ref, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import {validateRequired, validateSelect} from '~~/services/common.js';
import { HttpStatus, HttpCode } from '~~/constants/http-status.js';
import { displayAmountCharacters } from '~~/constants/format-string.js';

import DatepickerLite from "vue3-datepicker-lite";
import BaseButton from '~~/components/common/BaseButton.vue';
import BackButton from '~~/components/common/BackButton.vue';

import MaterialService from '~~/services/model/material.service';
import MaterialTypeService from '~~/services/model/materialType.service';
import MaterialBatchService from '~~/services/model/materialBatch.service';


export default {
    props:["id", "materialBatch"],
    components: { BaseButton, Form, Field, ErrorMessage, DatepickerLite, BackButton },
    data() {
        const locale = {
            format: "DD/MM/YYYY",
            weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            startsWeeks: 0,
            todayBtn: "Today",
            clearBtn: "Clear",
            closeBtn: "Close",
        };

        return {
            locale
        }
    },
    setup(props) {
        const {$showToast} = useNuxtApp();
        const materialBatchId = ref(props.id);
        const materialBatch = reactive({
            code: '',
            materialId: '',
            materialName: '',
            materialTypeId: '',
            unit: '',
            amount: 0,
            receiptDate: '',
            expiredDate: '',
            displayExpiredDate: '',
            price: 0,
            sales: 0,
            createdBy: '',
            createdDate: ''
        });
        const materials = ref([]);
        const materialTypes = ref([]);
        const notiByName = ref("");

        watch(props, () => {
            setMaterialBatch();
        });

        // ---------------------- START set state data --------------------
        function setMaterialBatch() {
            let materialBatchExisted = props.materialBatch;
            if (materialBatchExisted) {
                materialBatch.code = materialBatchExisted.code;
                materialBatch.materialId = materialBatchExisted.material?.id;
                materialBatch.materialName = materialBatchExisted.material?.name;
                materialBatch.materialTypeId = materialBatchExisted.material?.materialType?.id;
                materialBatch.unit = materialBatchExisted.unit;
                materialBatch.amount = materialBatchExisted.amount;
                materialBatch.receiptDate = materialBatchExisted.receiptDate;
                materialBatch.expiredDate = materialBatchExisted.expiredDate;
                materialBatch.displayExpiredDate = materialBatchExisted.expiredDate;
                materialBatch.price = materialBatchExisted.price;
                materialBatch.sales = materialBatchExisted.sales;
                materialBatch.createdBy = materialBatchExisted.createdBy;
                materialBatch.createdDate = materialBatchExisted.createdDate;
            }
        }
        // ---------------------- END set state data --------------------

        function loadMaterialTypes() {
            MaterialTypeService.getAll()
            .then((response) => {
                let responseData = response.data;
                if (responseData) materialTypes.value = responseData;
            })
            .catch((error) => {
                $showToast("Error loading material types", "error", 2000);
                console.log("Error: ", error);
            });
        }

        function searchMaterialsByName() {
            if (materialBatch.materialName) {
                let criteria = {name: materialBatch.materialName};
                MaterialService.searchMaterialsByName(criteria)
                .then((response) => {
                    let responseData = response.data;
                    if (response.status == HttpStatus.OK) {
                        materials.value = responseData;
                        notiByName.value = "";
                        renderMaterials(responseData);
                    } else notiByName.value = responseData;
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    if (error.code == HttpCode.ERR_BAD_REQUEST) {
                        renderMaterials([]);
                        notiByName.value = "Không tồn tài vật tư."
                    }
                });
            } else {
                renderMaterials([]);
            }
        }

        function onSubmit() {
            console.log("onSubmit");
            let materialBatchDTO = {
                id: materialBatchId.value,
                code: materialBatch.code,
                materialName: materialBatch.materialName,
                materialTypeId: materialBatch.materialTypeId,
                unit: materialBatch.unit,
                amount: materialBatch.amount,
                displayExpiredDate: '',
                receiptDate: materialBatch.receiptDate,
                price: materialBatch.price,
                sales: materialBatch.sales
            };
            if (materialBatchId.value) {
                materialBatchDTO["createdBy"] = materialBatch.createdBy;
                materialBatchDTO["createdDate"] = materialBatch.createdDate;
            }
            MaterialBatchService.saveOrUpdate(materialBatchDTO)
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    $showToast("Lưu thông tin lô vật tư thành công!", "success", 2000);
                    navigateTo('/common/materialBatch');
                }
            })
            .catch((error) => {
                $showToast("Lưu thông tin lô vật tư không thành công!", "error", 2000);
                console.log("Error: ", error);
            });
        }

        function setMaterialChoose(material) {
            materialBatch.materialId = material.id;
            materialBatch.materialName = material.name;
            materialBatch.unit = material.unit;
            materialBatch.materialTypeId = material.materialType?.id;
            renderMaterials([]);
        }

        const renderMaterials = (items) => {            
            if (items.length > 0) document.getElementById("suggest__list").classList.remove("d-none");
            else document.getElementById("suggest__list").classList.add("d-none");
        }

        const setExpiredDate = (e) => materialBatch.displayExpiredDate = e;
        const generateCode = () => materialBatch.code = "LO_" + new Date().getTime();

        return {
            materialBatchId,
            materialBatch,
            materials,
            materialTypes,
            notiByName,

            validateSelect,
            validateRequired,
            searchMaterialsByName,
            setMaterialChoose,
            setExpiredDate,
            displayAmountCharacters,
            generateCode,
            loadMaterialTypes,
            onSubmit
        }
    },
    created() {
        this.loadMaterialTypes();
    }
}
</script>
<style lang="scss">
    
</style>