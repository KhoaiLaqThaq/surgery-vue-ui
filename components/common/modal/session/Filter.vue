<template>
    <div class="modal fade" id="sessionFilter" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content pb-3">
                <div class="modal-header">
                    <h5 class="modal-title">{{ modalTitle }}</h5>
                    <button type="button" id="modal-filter-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <span class="text-yl float-end cursor-pointer" @click="clearFilter()">{{ $t('label.action.removeFilter') }}</span>
                        </div>
                        <div class="col-12">
                            <!-- code -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="code" v-model="conditionFilter.code" />
                                <label for="code">{{ $t('label.session.code') }}</label>
                            </div>
                            <!-- /code -->
                            <!-- patientName -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="name" v-model="conditionFilter.patientName" />
                                <label for="name">{{ $t("label.patient.name") }}</label>
                            </div>
                            <!-- /patientName -->
                            <!-- diagnosis -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="diagnosis" v-model="conditionFilter.diagnosis" />
                                <label for="diagnosis">{{ $t('label.session.diagnosis') }}</label>
                            </div>
                            <!-- /diagnosis -->
                            <!-- symptom -->
                            <div class="form-floating mb-3 box">
                                <input type="text" class="form-control" id="symptom" v-model="conditionFilter.symptom" />
                                <label for="symptom">{{ $t('label.session.symptom') }}</label>
                            </div>
                            <!-- /symptom -->
                            <!-- rangeDate -->
                            <div class="form-floating mb-3 box">
                                <Datepicker v-model="conditionFilter.range" 
                                    @update:model-value="onChangeFilter"
                                    range
                                    multi-calendars close-on-scroll
                                    placeholder="Khoảng thời gian"
                                ></Datepicker>
                            </div>
                            <!-- /rangeDate -->
                            <!-- status -->
                            <div class="form-floating mb-3 box">
                                <select class="form-control" v-model="conditionFilter.status">
                                    <option v-for="(status, index) in statusList" :key="index" :value="status.value">
                                        {{ status.name }}
                                    </option>
                                </select>
                                <label for="status">{{ $t('label.session.status') }}</label>
                            </div>
                            <!-- /status -->
                        </div>
                    </div>
                </div>
                <div class="confirm-footer text-center">
                    <button class="btn btn-primary radius-unset" @click="updateConditionFilter()">{{ $t('label.action.apply') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, reactive } from "vue";

import Datepicker from '@vuepic/vue-datepicker';
import {sessionStatusList} from "~~/constants/enum.js";
export default {
    components: {
        Datepicker
    },
    props: {
        modalTitle: {
            type: String,
            required: true
        }
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
            status: '',
            range: null
        });

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

        function onChangeFilter(modelData) {
            if (modelData) {
                conditionFilter.filterFromDate = modelData[0];
                conditionFilter.filterToDate = modelData[1];
            } else {
                conditionFilter.filterFromDate = null;
                conditionFilter.filterToDate = null;
            }
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
            onChangeFilter
        }
    }
}
</script>
<style lang="">
    
</style>