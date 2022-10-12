<template>
    <div class="mt-3">
        <div class="card">
            <div class="card-header search-header">
                <h6 class="card-title">Tìm kiếm</h6>
            </div>
            <div class="card-body">
                <form @submit.prevent="listenerSearchForm()">
                    <div class="row mb-xs-3">
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="form-floating mb-3 box">
                                <input type="text" v-model="conditionSearch.code" id="code" class="form-control pr-5" />
                                <label for="code">Tìm kiếm theo mã phiên khám...</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="form-floating mb-3 box">
                                <input type="text" v-model="conditionSearch.patientName" id="patientName" class="form-control pr-5" />
                                <label for="patientName">Tìm kiếm theo tên bệnh nhân...</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="form-floating mb-3 box">
                                <input type="text" v-model="conditionSearch.diagnosis" id="diagnosis" class="form-control pr-5" />
                                <label for="diagnosis">Tìm kiếm theo chuẩn đoán...</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="form-floating mb-3 box">
                                <input type="text" v-model="conditionSearch.symptom" id="symptom" class="form-control pr-5" />
                                <label for="symptom">Tìm kiếm theo triệu chứng...</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="form-floating mb-3">
                                <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'"
                                    :name-attr="displaySearchFromDate"
                                    :show-bottom-button="true" :value-attr="displaySearchFromDate" :locale="locale"
                                    @value-changed="setDisplayFromDate"
                                />
                                <label>Từ ngày...</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="form-floating mb-3">
                                <datepicker-lite class="form-control picker-date box" :class-attr="'border-none'" 
                                    :name-attr="displaySearchToDate"
                                    :show-bottom-button="true" :value-attr="displaySearchToDate" :locale="locale"
                                    @value-changed="setDisplayToDate"
                                />
                                <label>Đến ngày...</label>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="form-floating mb-3 box">
                                <select v-model="conditionSearch.status" class="form-select">
                                    <option v-for="(status, index) in sessionStatusList" :key="index" :value="status.value">
                                        {{ status.name }}
                                    </option>
                                </select>
                                <label for="floatingSelect">Tìm kiếm theo trạng thái...</label>
                            </div>
                        </div>
                    </div>
                    <div class="row ms-auto">
                        <div class="col-12 text-right">
                            <button type="submit" class="btn btn-primary text-small">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="d-flex mb-3">
            <TitleHeader :title="titlePage" />
            <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN])"
                :textSize="'text-small'" :title="'Thêm mới'" :routerPush="routerPush" class="ms-auto" />
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

export default {
    components: { 
        TitleHeader, 
        AddButton, 
        DatepickerLite, 
        TableSessionComponent, 
        Pagination 
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

        const setDisplayFromDate = (e) => displaySearchFromDate.value = e;
        const setDisplayToDate = (e) => displaySearchToDate.value = e;

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
            setDisplayFromDate,
            setDisplayToDate
        };
    },
    created() {
        this.searchCallApi();
    }
}
</script>
<style lang="scss">
    
</style>