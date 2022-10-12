<template>
    <div class="mt-3">
        <SearchSessionComponent 
            class="mb-3"
            @updateConditionSearch="listenerChangedConditionSearch($event)"
        />

        <div class="d-flex mb-3">
            <TitleHeader :title="titlePage" />
            <AddButton :textSize="'text-small'" :title="'Thêm mới'" :routerPush="routerPush" class="ms-auto" />
        </div>

        <div class="table-content">
            <TableSessionComponent :headers="tableHeaders" :items="pageDto.content"
                :actionEdit="true" :actionDelete="true" :routerPush="routerPush" :page="page" :size="size"
            />

            <Pagination
                :page="page" :size="size" :pagination="pageDto"
                @change-page="page = $event" @change-size="size = $event"
            />

        </div>
    </div>
</template>
<script>
import {ref, reactive} from 'vue';

import { ROLES } from '~~/constants/roles.js';
import { useCurrentsRole } from '~~/services/common.js';
import { sessionStatusList } from "~~/constants/enum.js";
import TitleHeader from '~~/components/common/TitleHeader.vue';
import AddButton from '~~/components/common/AddButton.vue';
import DatepickerLite from "vue3-datepicker-lite";
import SessionService from '~~/services/model/session.service';
import TableSessionComponent from '~~/components/common/table/TableSessionComponent.vue';
import Pagination from '~~/components/common/table/Pagination.vue';
import SearchSessionComponent from '~~/components/common/search/SearchSessionComponent.vue';

export default {
    components: {
        TitleHeader,
        AddButton,
        DatepickerLite,
        TableSessionComponent,
        Pagination,
        SearchSessionComponent
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

        const tableHeaders = [
            { text: "STT", value: "id", classCss: "hidden-xs"},
            { text: "Mã", value: "code", classCss: "radius-xs-top-left-20"},
            { text: "Chuẩn đoán", value: "diagnosis", classCss: "hidden-xs"},
            { text: "Triệu chứng", value: "symptom", classCss: "hidden-xs"},
            { text: "Pháp đồ", value: "treatmentPlan", classCss: "hidden-xs"},
            { text: "Trạng thái", value: "status"},
            { text: "Ngày khám", value: "createdDate", classCss: "hidden-xs"},
        ];

        return {
            locale: locale,
            tableHeaders: tableHeaders,
            sessionStatusList: sessionStatusList,
            titlePage: "Quản lý danh sách phiên khám",
            routerPush: "/session/form"
        };
    },
    setup() {
        const { $showToast } = useNuxtApp();
        const currentRole = useCurrentsRole();
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
        const conditionSearch = reactive({
            code: "",
            patientName: "",
            diagnosis: "",
            symptom: "",
            status: null
        });
        const displaySearchFromDate = ref("");
        const displaySearchToDate = ref("");

        watch([page, size], () => {
            searchCallApi();
        });

        const listenerSearchForm = () => {
            if (page.value == 0) searchCallApi();
            else page.value = 0;
        };

        // TODO: setState
        function setPagination(data) {
            page.value = data.page;
            size.value = data.size;

            pageDto.content = data.content;
            pageDto.number = data.number;
            pageDto.numberOfElements = data.numberOfElements;
            pageDto.totalPages = data.totalPages;
            pageDto.totalElements = data.totalElements;
        }

        // TODO: search results
        function searchCallApi() {
            let criteria = {
                page: page.value,
                size: size.value,
                code: conditionSearch.code,
                patientName: conditionSearch.patientName,
                diagnosis: conditionSearch.diagnosis,
                symptom: conditionSearch.symptom,
                status: conditionSearch.status,
                displaySearchFromDate: displaySearchFromDate.value,
                displaySearchToDate: displaySearchToDate.value
            };

            SessionService.search(criteria)
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    setPagination(responseData);
                }
            })
            .catch((error) => {
                $showToast("Tìm kiếm phiên khám có vấn đề", "warning", 2000);
                console.log("Error: ", error);
            });
        }

        // TODO: listener change state and then setState searching
        function listenerChangedConditionSearch(e) {
            console.log("Listener changed: ", e);
            conditionSearch.code = e.code;
            conditionSearch.patientName = e.patientName;
            conditionSearch.diagnosis = e.diagnosis;
            conditionSearch.symptom = e.symptom;
            conditionSearch.status = e.status;
            displaySearchFromDate.value = e.filterFromDate;
            displaySearchToDate.value = e.filterToDate;
            searchCallApi();
        }

        return {
            page, size,
            pageDto,
            ROLES,
            currentRole,
            conditionSearch,
            displaySearchFromDate,
            displaySearchToDate,

            useCurrentsRole,
            listenerSearchForm,
            searchCallApi,
            listenerChangedConditionSearch
        };
    },
    created() {
        this.searchCallApi();
    }
}
</script>
<style lang="scss">
    
</style>