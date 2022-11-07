<template>
    <div class="modal fade" id="addPrescription" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog mw50">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Đơn thuốc</h5>
                    <button type="button" id="modal-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col-12 text-right">
                            <button class="btn btn-primary" type="button" @click="addMaterialForPrescription()"><IconPlus /> Thêm thuốc</button>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="table-container bg-white" id="table">
                            <div class="tr bg-white">
                                <div class="th" v-for="(item, index) in tableHeaders" :key="index" :class="item.classCss">{{item.text}}</div>
                            </div>
                            <div class="tr bg-white material-item" v-for="(item, index) in materialsInPrescriptions" :key="index">
                                <div class="td w-auto">{{ index + 1 }}</div>
                                <div class="td">
                                    <Select2 :id="index" class="minW-250" :title="'Tên thuốc'" :items="materials"
                                        @change-value="listenerChangedValue($event)"
                                        @set-item-active="setItemActive($event)"
                                    />
                                </div>
                                <div class="td">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" :value="item.material?.total" />
                                    </div>
                                </div>
                                <div class="td">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="item.amount" @input="autocompletePricing(index)" />
                                    </div>
                                </div>
                                <div class="td">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="item.unit" />
                                    </div>
                                </div>
                                <div class="td">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="item.totalPrice" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <BaseButton @click="apply()" id="btnApply" class="btn-primary box ms-auto" :btnType="'button'" :name="'Áp dụng'" :textSize="'text-small'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref, reactive, watch} from 'vue';

import BaseButton from '~~/components/common/BaseButton.vue';
import Select2 from '~~/components/common/Select2.vue';
import MaterialService from '~~/services/model/material.service';
import IconPlus from '~~/assets/images/icons/IconPlus.vue';

export default {
    components: { Select2, IconPlus, BaseButton },
    setup(props, {emit}) {
        const { $showToast } = useNuxtApp();
        const tableHeaders = [
            { text: "STT", classCss: "w-auto" },
            { text: "Tên thuốc", classCss: "minW-200" },
            { text: "Tồn kho" },
            { text: "Số lượng" },
            { text: "Đơn vị" },
            { text: "Thành tiền" },
            // { text: "#" }
        ];
        const materialName = ref('');
        const materials = ref({});
        const materialsInPrescriptions = ref([]);
        const material = reactive({
            id: null,
            name: '',
            total: 0,
            sales: 0
        });
        const prescription = reactive({
            id: null,
            material: null,
            session: null,
            dosage: '',
            amount: 0,
            unit: '',
            note: '',
            totalPrice: 0
        });

        watch([materialName], () => onLoadMaterialsByName());

        function onLoadMaterialsByName() {
            if (materialName.value && materialName.value.length > 0) {
                resetDataSelect2();
                MaterialService.searchMaterialsByName({name: materialName.value})
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) materials.value = responseData;
                    else materials.value = [];
                })
                .catch((error) => {
                    console.log("Error: ", error);
                })
            } else {
                materials.value = {};
            }
        }

        const addMaterialForPrescription = () => materialsInPrescriptions.value.push({});
        const listenerChangedValue = (e) => materialName.value = e;
        const resetDataSelect2 = () => materials.value = {};

        function setItemActive(e) {
            console.log("material: ", e);
           if (e) {
                // set material
                material.id = e.id;
                material.name = e.name;
                material.total = e.total;
                material.sales = e.sales;
                // set prescription
                prescription.amount = 0;
                prescription.unit = e.unit;
                prescription.dosage = '';
                prescription.note = '';
                prescription.totalPrice = 0;
                let prescriptionIndex = {
                    material,
                    amount: prescription.amount,
                    unit: prescription.unit,
                    dosage: prescription.dosage,
                    note: prescription.note,
                    totalPrice: prescription.totalPrice
                };
                materialsInPrescriptions.value[e.index] = Object.assign({}, prescriptionIndex);
                resetDataSelect2();
           }
        }

        function apply() {
            let prescriptions = materialsInPrescriptions.value;
            console.log("materialsInPrescriptions value: ", prescriptions);
            emit("add-prescription", prescriptions);
            onClickToCloseModal();
        }

        function autocompletePricing(index) {
            console.log("index value: ", index);
            if (materialsInPrescriptions.value[index].material && materialsInPrescriptions.value[index].material.sales > 0) {
                if (materialsInPrescriptions.value[index].material?.total > materialsInPrescriptions.value[index].amount) {
                    document.getElementById('btnApply').disabled = false;
                    materialsInPrescriptions.value[index].totalPrice = materialsInPrescriptions.value[index].material?.sales * materialsInPrescriptions.value[index].amount;
                } else {
                    $showToast('Số lượng vượt quá trong kho! Hãy nhập lại!', 'warning', 2000);
                    document.getElementById('btnApply').disabled = true;
                }
            }
        }

        const onClickToCloseModal = () => document.getElementById('modal-close').click();

        return {
            materials,
            tableHeaders,
            materialsInPrescriptions,

            apply,
            setItemActive,
            listenerChangedValue,
            addMaterialForPrescription,
            autocompletePricing
        };
    }
}
</script>
<style lang="">
    
</style>