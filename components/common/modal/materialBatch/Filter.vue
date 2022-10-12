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
                                <input type="text" class="form-control" id="name" v-model="name" />
                                <label for="name">Tên vật tư</label>
                            </div>
                        </div>
                        <!-- /name -->

                        <!-- price -->
                        <div class="col-12">
                            <div class="range-value">
                                Giá nhập từ <span class="fw-bold">{{rangePrice.minPrice}} ₫</span> 
                                đến <span class="fw-bold">{{rangePrice.maxPrice}} ₫</span>
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
                        <!-- from receiptDate -->
                        <div class="col-md-6 col-sm-12 mb-3">
                            <div class="form-floating">
                                <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'"
                                    :name-attr="displaySearchFromDate"
                                    :show-bottom-button="true" :value-attr="displaySearchFromDate" :locale="locale"
                                    @value-changed="setDisplayFromDate"
                                />
                                <label>Từ ngày...</label>
                            </div>
                        </div>
                        <!-- /from receiptDate -->
                        <!-- to receiptDate -->
                        <div class="col-md-6 col-sm-12 mb-3">
                            <div class="form-floating">
                                <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'" 
                                    :name-attr="displaySearchToDate"
                                    :show-bottom-button="true" :value-attr="displaySearchToDate" :locale="locale"
                                    @value-changed="setDisplayToDate"
                                />
                                <label>Đến ngày...</label>
                            </div>
                        </div>
                        <!-- /to receiptDate -->
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
import { ref, reactive } from 'vue';

import DatepickerLite from "vue3-datepicker-lite";
import MultiRangeSlider from "multi-range-slider-vue";
import "~~/node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";
import "~~/node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";

export default {
    props: [ "modalTitle", "maxValue", "minValue", "minValueCurrent", "maxValueCurrent", "searchMaterial", "searchMaterialBatch" ],
    components: {
        MultiRangeSlider,
        DatepickerLite
    },
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
        const name = ref('');
        const rangePrice = reactive({
            minPrice: props.minValue,
            maxPrice: props.maxValue
        });
        const displaySearchFromDate = ref('');
        const displaySearchToDate = ref('');

        const setDisplayFromDate = (e) => displaySearchFromDate.value = e;
        const setDisplayToDate = (e) => displaySearchToDate.value = e;

        function update_oBarValues(e) {
            rangePrice.minPrice = e.minValue;
            rangePrice.maxPrice = e.maxValue;
        }

        function updateConditionFilter() {
            let conditionFilter = {
                materialName: name.value,
                minPrice: rangePrice.minPrice,
                maxPrice: rangePrice.maxPrice,
                clearFilterStatus: false 
            };
            // TODO: setData dành riêng cho tìm kiếm lô
            if (props.searchMaterialBatch) {
                conditionFilter['searchFromDate'] = displaySearchFromDate.value;
                conditionFilter['searchToDate'] = displaySearchToDate.value;
            }
            onClickToCloseModal();
            emit('update-condition-filter', conditionFilter);
        }

        function clearFilter() {
            onClickToCloseModal();
            emit('update-condition-filter', {});
        }

        const onClickToCloseModal = () => document.getElementById('modal-filter-close').click();

        return {
            name,
            rangePrice,
            displaySearchFromDate,
            displaySearchToDate,

            updateConditionFilter,
            update_oBarValues,
            setDisplayFromDate,
            setDisplayToDate,
            clearFilter
        }
    }
}
</script>
<style lang="">
    
</style>