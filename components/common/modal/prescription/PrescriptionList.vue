<template>
    <div class="modal fade" id="prescriptionModal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Đơn thuốc</h5>
                    <button type="button" id="modal-filter-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="table-container bg-white">
                            <div class="tr">
                                <div class="th" v-for="(item, index) in tableHeaders" :key="index">{{item.text}}</div>
                            </div>
                            <div class="tr" v-for="(item, index) in prescriptions" :key="index">
                                <div class="td">{{ index + 1 }}</div>
                                <div class="td">{{ displayTextTooLong(125, item.material?.name) }}</div>
                                <div class="td">{{ item.amount }}</div>
                                <div class="td">{{ item.unit }}</div>
                                <div class="td"><span class="d-inline">{{ item.material?.sales * item.amount }} ₫</span></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 ms-auto">
                            <label for="">Tổng tiền thuốc: </label> <span class="fw-bold ps-3 text-medium">{{calculatePricing()}} ₫</span>
                        </div>
                    </div>
                </div>

                <div class="confirm-footer">
                    <button class="btn btn-primary radius-unset" @click="onClickToCloseModal()">Đóng</button>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
import { ref, computed } from 'vue';
import {displayTextTooLong} from "~~/constants/format-string.js";
export default {
    props: ["prescriptions"],
    setup(props) {
        const totalPrice = ref(0);
        const listPrescription = computed(() => props.prescriptions);
        const tableHeaders = [
            { text: "STT", value: "id", classCss: "hidden-xs"},
            { text: "Tên thuốc", value: "materialName"},
            { text: "Số lượng", value: "amount"},
            { text: "Đơn vị", value: "unit"},
            { text: "Giá", value: "sales"}
        ];
        
        function calculatePricing() {
            totalPrice.value = 0;
            if (listPrescription.value) {
                for(let i = 0; i < listPrescription.value.length; i++) {
                    totalPrice.value += listPrescription.value[i].amount * listPrescription.value[i].material?.sales;
                }
            }
            return totalPrice.value;
        }


        const onClickToCloseModal = () => document.getElementById('modal-filter-close').click();

        return {
            tableHeaders,

            onClickToCloseModal,
            displayTextTooLong,
            calculatePricing
        }
    }
}
</script>
<style lang="scss">
    
</style>