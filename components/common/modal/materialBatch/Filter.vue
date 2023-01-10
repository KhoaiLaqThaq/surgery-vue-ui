<template>
    <div class="modal fade" id="materialBatchFilter" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{modalTitle}}</h5>
                    <button type="button" id="modal-filter-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col-12 mb-3">
                            <span class="text-yl float-end cursor-pointer" @click="clearFilter()">Bỏ lọc</span>
                        </div>
                        <!-- name -->
                        <div class="col-12 mb-3">
                            <div class="form-floating box">
                                <input type="text" class="form-control" id="name" v-model="conditionFilter.name" />
                                <label for="name">Tên vật tư</label>
                            </div>
                        </div>
                        <!-- /name -->

                        <!-- price -->
                        <div class="col-12">
                            <div class="range-value">
                                Giá nhập từ <span class="fw-bold">{{conditionFilter.minPrice}} ₫</span> 
                                đến <span class="fw-bold">{{conditionFilter.maxPrice}} ₫</span>
                            </div>
                        </div>
                        <div class="col-12 mb-3 container-theme">
                            <MultiRangeSlider 
                                baseClassName="multi-range-slider-bar-only"
                                :min-value="minValueCurrent"
                                :max-value="maxValueCurrent"
                                :max="maxValue"
                                :min="0"
                                :step="1000"
                                :range-margin="0"
                                @input="update_oBarValues"
                            />
                        </div>
                        <!-- /price -->
                    </div>
                    <div class="row" v-if="searchMaterialBatch">
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
                    </div>
                </div>

                <div class="confirm-footer">
                    <button class="btn btn-primary radius-unset btn__apply" @click="updateConditionFilter()">Áp dụng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, reactive } from 'vue';

import Datepicker from '@vuepic/vue-datepicker';
import MultiRangeSlider from "multi-range-slider-vue";
import "~~/node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";
import "~~/node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";

export default {
    props: [ "modalTitle", "maxValue", "minValue", "minValueCurrent", "maxValueCurrent", "searchMaterial", "searchMaterialBatch" ],
    components: {
        MultiRangeSlider, Datepicker
    },
    setup(props, {emit}) {
        const count = ref(0);
        const conditionFilter = reactive({
            name: '',
            minPrice: props.minValue,
            maxPrice: props.maxValue,
            filterFromDate: '',
            filterToDate: '',
            range: null
        });

        function update_oBarValues(e) {
            conditionFilter.minPrice = e.minValue;
            conditionFilter.maxPrice = e.maxValue;
        }

        function updateConditionFilter() {
            let conditionFilter = {
                materialName: conditionFilter.name,
                minPrice: conditionFilter.minPrice,
                maxPrice: conditionFilter.maxPrice,
                filterFromDate: conditionFilter.filterFromDate,
                filterToDate: conditionFilter.filterToDate,
                clearFilterStatus: false,
                countFilter: countFilter()
            };
            onClickToCloseModal();
            emit('update-condition-filter', conditionFilter);
        }

        function onChangeFilter(modelData) {
            console.log('modelData:', modelData);
            if (modelData) {
                conditionFilter.filterFromDate = modelData[0];
                conditionFilter.filterToDate = modelData[1];
            } else {
                conditionFilter.filterFromDate = null;
                conditionFilter.filterToDate = null;
            }
        }

        function countFilter() {
            count.value = 0;
            if (conditionFilter.name) count.value++;
            if (conditionFilter.maxPrice > 0) count.value++;
            if (props.searchMaterialBatch) {
                if (conditionFilter.filterFromDate) count.value++;
                if (conditionFilter.filterToDate) count.value++;
            }
            return count.value;
        }

        function clearFilter() {
            onClickToCloseModal();
            emit('update-condition-filter', {clearFilterStatus: true});
        }

        const onClickToCloseModal = () => document.getElementById('modal-filter-close').click();

        return {
            onChangeFilter,
            conditionFilter,

            updateConditionFilter,
            update_oBarValues,
            clearFilter
        }
    }
}
</script>
<style lang="">
    
</style>