<template>
    <div class="mt-3">
        <div class="d-flex mb-3">
            <TitleHeader :title="titlePage" />
            <AddButton :textSize="'text-small'" :title="btnTitle" :routerPush="routerPush" class="ms-auto" />
        </div>
        <SearchComponent :multiRange="true" @updateKeyword="listenerRangePriceChange($event)" class="mb-3" />
        <TableMaterialComponent :headers="tableHeaders" :items="pageDto.content" :actionEdit="true" :actionDelete="false" :routerPush="routerPush" :page="page" :size="size" />
        <Pagination :page="page" :size="size" :pagination="pageDto" @change-page="listenerChangedPage($event)" @change-size="listenerChangedSize($event)" />
    </div>
</template>
<script>
import { ref, reactive } from 'vue';

import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import Pagination from '~~/components/common/table/Pagination.vue';
import SearchComponent from '~~/components/common/search/SearchMaterialComponent.vue';
import TableMaterialComponent from '~~/components/common/table/TableMaterialComponent.vue';
import MaterialService from '~~/services/model/material.service';

export default {
    components: {
        TitleHeader,
        AddButton,
        Pagination,
        SearchComponent,
        TableMaterialComponent
    },
    data() {
        return {
            titlePage: "Quản lý danh sách vật tư",
            routerPush: "/common/material/form",
            btnTitle: "Thêm mới"
        }
    },
    setup() {
        const { $showToast } = useNuxtApp();
        const page = ref(0);
        const size = ref(10);
        const conditionSearch = reactive({
            keyword: "",
            minPrice: 0,
            maxPrice: 0
        });
        const pageDto = reactive({
            content: [],
            number: 0,
            numberOfElements: 10,
            totalPages: 0,
            totalElements: 0,
            first: false,
            last: false,
        });

        let tableHeaders = [
            { text: 'STT', value: 'id', classCss: 'hidden-xs' },
            { text: 'Mã vật tư', value: 'code', classCss: 'hidden-xs'},
            { text: 'Tên vật tư', value: 'name', classCss: 'radius-xs-top-left-20'},
            { text: 'Thành phần', value: 'composition'},
            { text: 'Giá nhập', value: 'price', classCss: 'minW-100'},
            { text: 'Giá bán', value: 'sales', classCss: 'minW-100'}
        ];

        function setPagination(data) {
            page.value = data.page;
            size.value = data.size;

            pageDto.content = data.content;
            pageDto.number = data.number;
            pageDto.numberOfElements = data.numberOfElements;
            pageDto.totalPages = data.totalPages;
            pageDto.totalElements = data.totalElements;
        }

        function searchCallApi() {
            let criteria = {
                page: page.value,
                size: size.value,
                keyword: conditionSearch.keyword,
                minPrice: conditionSearch.minPrice,
                maxPrice: conditionSearch.maxPrice
            }
            MaterialService.search(criteria)
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    setPagination(responseData);
                }
            }).catch((error) => {
                $showToast("Tìm kiếm vật tư xảy ra lỗi!", "error", 2000);
                console.log("Error: ", error);
            })
        }

        function listenerRangePriceChange(e) {
            conditionSearch.keyword = e.keyword;
            conditionSearch.minPrice = e.minPrice;
            conditionSearch.maxPrice = e.maxPrice;
            searchCallApi();
        }

        function listenerChangedPage(pageNum) {
            page.value = pageNum;
            searchCallApi();
        }

        function listenerChangedSize(sizeNum) {
            size.value = sizeNum;
            page.value = 0;
            searchCallApi();
        }

        return {
            page, size,
            pageDto,
            tableHeaders,

            searchCallApi,
            listenerRangePriceChange,
            listenerChangedSize,
            listenerChangedPage
        }
    },
    created() {
        this.searchCallApi();
    }
}
</script>
<style lang="scss">
    
</style>