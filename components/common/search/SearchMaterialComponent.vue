<template>
    <div class="d-flex px-2 py-2 box">
        <div class="filter search-filter border-style cursor-pointer">
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
        <MultiRange @updateRangePrice="listenerRangePriceChange($event)" :modalTitle="'Giá'" />
    </div>
</template>
<script>
import {ref, reactive} from 'vue';
import FilterIcon from '~~/assets/images/icons/actions/FilterIcon.vue';
import MultiRange from '~~/components/common/modal/MultiRange.vue';

export default {
    components: {
        FilterIcon,
        MultiRange
    },
    props: [
        "multiRange",
        "simplePrice",
        "keyword"
    ],
    setup(props, {emit}) {
        const priceTitle = ref("Giá +");
        const conditionSearch = reactive({
            keyword: "",
            minPrice: 0,
            maxPrice: 0
        });

        function listenerRangePriceChange(e) {
            priceTitle.value = e.minPrice + "₫ - " + e.maxPrice + "₫";
            conditionSearch.minPrice = e.minPrice;
            conditionSearch.maxPrice = e.maxPrice;
        }

        const updateConditionSearch = () => emit("update-keyword", conditionSearch);

        return {
            priceTitle,
            conditionSearch,

            updateConditionSearch,
            listenerRangePriceChange
        }
    }
}
</script>
<style lang="scss" scoped>
.filter {
    border-radius: 5px;
    margin-right: 10px;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;

    .filter-title {
        padding: 8px 15px;
        display: inline-block;
        vertical-align: middle;
    }

    // span {
    //     vertical-align: middle;
    //     justify-content: center;
    // }
    &.inactive {
        background-color: rgb(241 245 249);
    }
}
.search-filter {
    border: 1px solid rgba(0, 0, 0, 0.08);
    &:hover {
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    svg {
        width: 16px;
        height: 16px;
    }
}
</style>