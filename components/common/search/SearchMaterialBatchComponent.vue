<template>
    <div class="d-flex p-2 box">
        <div class="filter search-filter border-style cursor-pointer"
            data-bs-toggle="modal" data-bs-target="#materialBatchFilter"
        >
            <span class="filter-title"><FilterIcon /> <span class="ms-1">Lọc</span></span>
        </div>
        <div class="filter inactive cursor-pointer" v-if="multiRange"
            data-bs-toggle="modal" data-bs-target="#multiRange"
        >
            <span class="filter-title">{{ priceTitle }}</span>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" v-model="conditionSearch.keyword">
        </div>
        <div class="form-group ms-auto">
            <button class="btn btn-secondary" @click="updateConditionSearch()">Tìm kiếm</button>
        </div>
        <!-- modal -->
        <MultiRange @updateRangePrice="listenerRangePriceChange($event)" 
            :modalTitle="'Giá'"
            :minValue="rangeValue.minValue"
            :maxValue="rangeValue.maxValue"
            :minValueCurrent="conditionSearch.minPrice"
            :maxValueCurrent="conditionSearch.maxPrice"
        />
        <ConditionFilter
            @updateConditionFilter="listenerConditionFilterChange($event)" 
            :modalTitle="'Lọc Kết Quả'" 
            :minValue="rangeValue.minValue"
            :maxValue="rangeValue.maxValue"
            :minValueCurrent="conditionSearch.minPrice"
            :maxValueCurrent="conditionSearch.maxPrice"
            :searchMaterialBatch="true"
        />
        <!-- /modal -->
    </div>
</template>
<script>
import {ref, reactive} from 'vue';

import FilterIcon from '~~/assets/images/icons/actions/FilterIcon.vue';
import MultiRange from '~~/components/common/modal/MultiRange.vue';
import ConditionFilter from '~~/components/common/modal/materialBatch/Filter.vue';

export default {
    components: { FilterIcon, MultiRange, ConditionFilter },
    props: [ "multiRange", "simplePrice", "keyword" ],
    setup(props, {emit}) {
        const priceTitle = ref("Giá +");
        const rangeValue = reactive({
            minValue: 0,
            maxValue: 1000000
        });
        const conditionSearch = reactive({
            keyword: "",
            minPrice: 0,
            maxPrice: 1000000,
            materialName: "",
            searchFromDate: "",
            searchToDate: ""
        });

        function listenerRangePriceChange(e) {
            console.log("listenerRangePriceChange: ", e);
            priceTitle.value = e.minPrice + "₫ - " + e.maxPrice + "₫";
            conditionSearch.minPrice = e.minPrice;
            conditionSearch.maxPrice = e.maxPrice;
        }

        function listenerConditionFilterChange(e) {
            let priceTitleString = "";
            if (e.clearFilterStatus)
                priceTitleString = "Giá +";
            else
                priceTitleString = e.minPrice + "₫ - " + e.maxPrice + "₫";
            
            priceTitle.value = priceTitleString;
            conditionSearch.materialName = e.materialName;
            conditionSearch.searchFromDate = e.searchFromDate;
            conditionSearch.searchToDate = e.searchToDate;
            conditionSearch.minPrice = e.minPrice;
            conditionSearch.maxPrice = e.maxPrice;
            console.log("condition search price, min :", e.minPrice, " max: ", e.maxPrice)
        }

        const updateConditionSearch = () => emit("update-filter", conditionSearch);

        return {
            rangeValue,
            priceTitle,
            conditionSearch,

            updateConditionSearch,
            listenerRangePriceChange,
            listenerConditionFilterChange
        }
    }
}
</script>
<style lang="scss">
    
</style>