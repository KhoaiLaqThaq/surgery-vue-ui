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
                            <button class="btn btn-primary" type="button" @click="addRow()"><IconPlus /> Thêm thuốc</button>
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
                                        <input type="text" class="form-control" v-model="item.total" />
                                    </div>
                                </div>
                                <div class="td">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="item.amount" />
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref, reactive, watch} from 'vue';

import Select2 from '~~/components/common/Select2.vue';
import MaterialService from '~~/services/model/material.service';
import IconPlus from '~~/assets/images/icons/IconPlus.vue';

export default {
    components: { Select2, IconPlus },
    setup() {
        // const stt = ref(0);
        const tableHeaders = [
            { text: "STT", classCss: "w-auto" },
            { text: "Tên thuốc", classCss: "minW-200" },
            { text: "Tồn kho" },
            { text: "Số lượng" },
            { text: "Đơn vị" },
            { text: "Thành tiền" },
            { text: "#" }
        ];
        const materialName = ref('');
        const materials = ref({});
        const materialsInPrescriptions = ref([]);
        const material = reactive({
            id: null,
            name: '',
            total: 0,
            amount: 0,
            unit: '',
            totalPrice: 0
        });
        const materialMock = reactive({
            id: null,
            name: '',
            total: 0,
            amount: 0,
            unit: '',
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
                })
                .catch((error) => {
                    console.log("Error: ", error);
                })
            } else {
                materials.value = {};
            }
        }

        const addMaterialForPrescription = () => {
            materialsInPrescriptions.value.push(materialMock);
        }
        const listenerChangedValue = (e) => materialName.value = e;
        const resetDataSelect2 = () => materials.value = {};

        function setItemActive(e) {
            console.log("Set item active: ", e);
           if (e) {
                material.id = e.id;
                material.name = e.name;
                material.total = e.total;
                material.amount = 0;
                material.unit = e.unit;
                material.totalPrice = 0;
                console.log("set item index: ", e.index);
                // materialsInPrescriptions.value[e.index] = material;
                materialsInPrescriptions.value.splice(e.index, 1, material);
                
                resetDataSelect2();
           }
        }

        function addRow() {
            addMaterialForPrescription();
        }

        return {
            // stt,
            materials,
            tableHeaders,
            materialsInPrescriptions,

            addRow,
            setItemActive,
            listenerChangedValue,
            addMaterialForPrescription
        };
    }
}
</script>
<style lang="">
    
</style>