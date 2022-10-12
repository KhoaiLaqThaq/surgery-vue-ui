<template>
    <div class="mt-3">
        <div class="d-flex mb-3">
            <TitleHeader :title="titlePage" />
            <AddButton :textSize="'text-small'" :title="btnTitle" :routerPush="routerPush" class="ms-auto" />
        </div>

        <SearchMaterialBatchComponent
            :multiRange="true" 
            @updateFilter="listenerConditionFilterChange($event)" 
            class="mb-3"
        />

        <TableMaterialBatchComponent :headers="tableHeaders" :items="pageDto.content" :actionEdit="true" :actionDelete="true" :routerPush="routerPush" :page="page" :size="size" />
        <Pagination
            :page="page" :size="size" :pagination="pageDto" 
            @change-page="page = $event" @change-size="size = $event"
        />
    </div>
</template>
<script>
import { ref, reactive } from 'vue';

import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import Pagination from '~~/components/common/table/Pagination.vue';
import TableMaterialBatchComponent from '~~/components/common/table/TableMaterialBatchComponent.vue';
import MaterialBatchService from '~~/services/model/materialBatch.service';
import SearchMaterialBatchComponent from '~~/components/common/search/SearchMaterialBatchComponent.vue';

export default {
    components: {
    TitleHeader,
    AddButton,
    Pagination,
    TableMaterialBatchComponent,
    SearchMaterialBatchComponent
},
    data() {
        return {
            titlePage: "Quản lý danh sách lô sản phẩm",
            routerPush: "/common/materialBatch/form",
            btnTitle: "Thêm mới"
        }
    },
    setup() {
        const { $showToast } = useNuxtApp();
        const material = reactive({
            code: '',
            name: ''
        });
        const conditionSearch = reactive({
            code: '',
            minPrice: 0,
            maxPrice: 0,
            searchFromDate: null,
            searchToDate: null
        });
        const page = ref(0);
        const size = ref(10);

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
            { text: "STT", value: "id", classCss: "hidden-xs"},
            { text: "Mã lô", value: "code"},
            { text: "Mã vật tư", value: "materialCode"},
            { text: "Vật tư", value: "materialName"},
            { text: "Đơn vị", value: "unit"},
            { text: "Số lượng", value: "amount"},
            { text: "Giá nhập", value: "price"},
            { text: "Ngày nhập", value: "receiptDate"}
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

        function listenSearchForm() {
            if (page.value == 0) searchCallApi();
            else page.value = 0;
        }

        function listenerConditionFilterChange(e) {
            console.log("listenerConditionFilterChange: ", e)
            material.name = e.materialName;
            conditionSearch.maxPrice = e.maxPrice;
            conditionSearch.minPrice = e.minPrice;
            conditionSearch.searchFromDate = e.searchFromDate;
            conditionSearch.searchToDate = e.searchToDate;
            searchCallApi();
        }

        function searchCallApi() {
            let criteria = {
                page: page.value,
                size: size.value,
                materialName: material.name,
                materialCode: material.code,
                code: conditionSearch.code,
                minPrice: conditionSearch.minPrice,
                maxPrice: conditionSearch.maxPrice,
                searchFromDate: conditionSearch.searchFromDate,
                searchToDate: conditionSearch.searchToDate
            };

            MaterialBatchService.search(criteria)
            .then((response) => {
                let responseData = response.data;
                if (responseData) setPagination(responseData);
            }).catch((error) => {
                $showToast("Tìm kiếm lô vật tư không thành công!", "error", 2000);
                console.log("Error: ", error);
            })
        }

        return {
            tableHeaders,
            page, size, pageDto,

            searchCallApi,
            listenSearchForm,
            listenerConditionFilterChange
        }
    },
    created() {
        this.searchCallApi();
    }
}
</script>
<style lang="">
    
</style>