<template>
    <div class="d-flex p-2 box">
        <div class="filter search-filter border-style cursor-pointer" data-bs-toggle="modal" data-bs-target="#sessionFilter">
            <span class="filter-title">
                <span class="filter-amount" v-if="amountFilter">{{ amountFilter }}</span>
                <FilterIcon />
                <span class="ms-1">Lọc</span>
            </span>
        </div>
        <div class="form-group ms-auto">
            <button class="btn btn-secondary" @click="updateConditionSearch()">Tìm kiếm</button>
        </div>
        <!-- modal -->
        <ConditionFilter
            :modalTitle="'Lọc Kết Quả'"
            @updateConditionFilter="listenerConditionFilterChange($event)"
        />
        <!-- /modal -->
    </div>
</template>
<script>
import {ref, reactive} from 'vue';

import FilterIcon from '~~/assets/images/icons/actions/FilterIcon.vue';
import ConditionFilter from '~~/components/common/modal/session/Filter.vue';

export default {
    components: {
        FilterIcon, ConditionFilter
    },
    setup(props, {emit}) {
        const amountFilter = ref(null);
        const conditionSearch = reactive({
            code: '',
            patientName: '',
            diagnosis: '',
            symptom: '',
            filterFromDate: '',
            filterToDate: '',
            status: ''
        });

        // TODO: listener change state and then set state
        function listenerConditionFilterChange(e) {
            conditionSearch.code = e.code;
            conditionSearch.patientName = e.patientName;
            conditionSearch.diagnosis = e.diagnosis;
            conditionSearch.symptom = e.symptom;
            conditionSearch.filterFromDate = e.filterFromDate;
            conditionSearch.filterToDate = e.filterToDate;
            conditionSearch.status = e.status;
            amountFilter.value = e.countFilter;
        }

        const updateConditionSearch = () => emit("update-condition-search", conditionSearch);

        return {
            amountFilter,
            
            listenerConditionFilterChange,
            updateConditionSearch
        }
    }
}
</script>
<style lang="scss">
</style>