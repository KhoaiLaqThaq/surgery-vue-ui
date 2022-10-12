<template>
    <div class="modal fade" id="sessionFilter" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" id="modal-filter-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <span class="text-yl float-end cursor-pointer" @click="clearFilter()">Bỏ lọc</span>
                        </div>
                        <div class="col-12">
                            <!-- code -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="code" v-model="conditionFilter.code" />
                                <label for="code">Mã phiên khám</label>
                            </div>
                            <!-- /code -->
                            <!-- patientName -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="name" v-model="conditionFilter.patientName" />
                                <label for="name">Tên bệnh nhân</label>
                            </div>
                            <!-- /patientName -->
                            <!-- diagnosis -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="diagnosis" v-model="conditionFilter.diagnosis" />
                                <label for="diagnosis">Chuẩn đoán</label>
                            </div>
                            <!-- /diagnosis -->
                            <!-- symptom -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="symptom" v-model="conditionFilter.symptom" />
                                <label for="symptom">Triệu chứng</label>
                            </div>
                            <!-- /symptom -->
                            <!-- fromDate -->
                            <div class="form-floating mb-3 box">
                                <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'"
                                    :name-attr="conditionFilter.filterFromDate"
                                    :show-bottom-button="true" :value-attr="conditionFilter.filterFromDate" :locale="locale"
                                    @value-changed="setFilterFromDate"
                                />
                                <label for="filterFormDate">Từ ngày khám</label>
                            </div>
                            <!-- /fromDate -->
                            <!-- toDate -->
                            <div class="form-floating mb-3 box">
                                <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'" 
                                    :name-attr="conditionFilter.filterToDate"
                                    :show-bottom-button="true" :value-attr="conditionFilter.filterToDate" :locale="locale"
                                    @value-changed="setFilterToDate"
                                />
                                <label for="filterToDate">Đến ngày khám</label>
                            </div>
                            <!-- /toDate -->
                            <!-- status -->
                            <div class="form-floating mb-3 box">
                                <select class="form-control" v-model="conditionFilter.status">
                                    <option v-for="(status, index) in statusList" :key="index" :value="status.value">
                                        {{ status.name }}
                                    </option>
                                </select>
                                <label for="status">Trạng thái</label>
                            </div>
                            <!-- /status -->
                        </div>
                    </div>
                </div>
                <div class="confirm-footer">
                    <button class="btn btn-primary radius-unset" @click="updateConditionFilter()">Áp dụng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, reactive } from "vue";

import DatepickerLite from "vue3-datepicker-lite";
import {sessionStatusList} from "~~/constants/enum.js";
export default {
    components: {
        DatepickerLite
    },
    props: [
        "modalTitle"
    ],
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
            locale: locale
        };
    },
    setup(props, {emit}) {
        const count = ref(0);
        const conditionFilter = reactive({
            code: '',
            patientName: '',
            diagnosis: '',
            symptom: '',
            filterFromDate: '',
            filterToDate: '',
            status: ''
        });

        const setFilterFromDate = (e) => conditionFilter.filterFromDate = e;
        const setFilterToDate = (e) => conditionFilter.filterToDate = e;

        function updateConditionFilter() {
            let sessionConditionFilter = {
                code: conditionFilter.code,
                patientName: conditionFilter.patientName,
                diagnosis: conditionFilter.diagnosis,
                symptom: conditionFilter.symptom,
                filterFromDate: conditionFilter.filterFromDate,
                filterToDate: conditionFilter.filterToDate,
                status: conditionFilter.status,
                countFilter: countFilter()
            };
            onClickToCloseModal();
            emit('update-condition-filter', sessionConditionFilter);
        }

        function countFilter() {
            count.value = 0;
            if (conditionFilter.code) count.value++;
            if (conditionFilter.patientName) count.value++;
            if (conditionFilter.diagnosis) count.value++;
            if (conditionFilter.symptom) count.value++;
            if (conditionFilter.filterFromDate) count.value++;
            if (conditionFilter.filterToDate) count.value++;
            if (conditionFilter.status) count.value++;
            return count.value;
        }

        function clearFilter() {
            onClickToCloseModal();
            emit('update-condition-filter', {});
        }


        const onClickToCloseModal = () => document.getElementById('modal-filter-close').click();

        return {
            conditionFilter,
            statusList: sessionStatusList,

            clearFilter,
            updateConditionFilter,
            setFilterFromDate,
            setFilterToDate
        }
    }
}
</script>
<style lang="">
    
</style>