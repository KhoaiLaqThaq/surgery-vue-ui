<template>
    <div class="modal fade" id="multiRange" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{modalTitle}}</h5>
                    <button type="button" id="modal-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="range-value">
                                {{modalTitle}} từ <span class="fw-bold">{{rangePrice.minPrice}} ₫</span> 
                                đến <span class="fw-bold">{{rangePrice.maxPrice}} ₫</span>
                            </div>
                        </div>
                        <div class="col-12 container-theme">
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
                    </div>
                </div>
                <div class="confirm-footer">
                    <button class="btn btn-primary radius-unset" @click="updateRangePrice()">Áp dụng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { watch, reactive } from 'vue';

import MultiRangeSlider from "multi-range-slider-vue";
import "~~/node_modules/multi-range-slider-vue/MultiRangeSliderBarOnly.css";
import "~~/node_modules/multi-range-slider-vue/MultiRangeSliderBlack.css";

export default {
    components: {
        MultiRangeSlider
    },
    props: [ "modalTitle", "maxValue", "minValue", "maxValueCurrent", "minValueCurrent" ],
    setup(props, {emit}) {
        const rangePrice = reactive({
            minPrice: props.minValue,
            maxPrice: props.maxValue
        });

        const conditionSearch = reactive({
            oBarMinValue: props.minValueCurrent,
            oBarMaxValue: props.maxValueCurrent
        });

        function update_oBarValues(e) {
            rangePrice.minPrice = e.minValue;
            rangePrice.maxPrice = e.maxValue;
        }

        const updateRangePrice = () => {
            document.getElementById("modal-close").click();
            emit("update-range-price", rangePrice);
        }

        return {
            rangePrice,
            conditionSearch,

            update_oBarValues,
            updateRangePrice
        }
    }
}
</script>
<style lang="scss">
.confirm-footer {
    width: 100%;
    button {
        width: 100%;
    }
}
</style>