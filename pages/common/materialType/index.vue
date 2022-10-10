<template>
    <div class="mt-3">
        <div class="d-flex mb-3">
            <TitleHeader :title="titlePage" />
            <AddButton :textSize="'text-small'" :title="btnTitle" :routerPush="routerPush" class="ms-auto" />
        </div>

        <TableMaterialTypeComponent 
            :page="page" :size="size" :headers="tableHeaders" :items="pageDto.content"
            :actionEdit="true" :actionDelete="false" :routerPush="routerPush"
        />
        <Pagination 
            :page="page" :size="size" :pagination="pageDto"
            @change-page="page = $event" @change-size="size = $event"
        />
    </div>
</template>
<script>
import { ref, reactive } from 'vue';

import MaterialTypeService from '~~/services/model/materialType.service';
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import Pagination from '~~/components/common/table/Pagination.vue';
import TableMaterialTypeComponent from "~~/components/common/table/TableMaterialTypeComponent.vue";

export default {
    components: {
        TitleHeader, AddButton, Pagination, TableMaterialTypeComponent
    },
    data() {
        return {
            titlePage: "Quản lý danh sách loại vật tư",
            routerPush: "/common/materialType/form",
            btnTitle: "Thêm mới"
        }
    },
    setup() {
        const { $showToast } = useNuxtApp();
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
            { text: "Mã loại", value: "code", classCss: "radius-xs-top-left-20"},
            { text: "Tên loại vật tư", value: "name"}
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
                size: size.value
            };
            MaterialTypeService.search(criteria)
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    setPagination(responseData);
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        }

        return {
            page, size,
            pageDto,
            tableHeaders,

            searchCallApi
        };
    },
    created() {
        this.searchCallApi();
    }
}
</script>
<style lang="">
    
</style>