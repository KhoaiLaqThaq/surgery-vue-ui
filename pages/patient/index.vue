<template>
    <div class="mt-3">
        <div class="card">
            <div class="card-header search-header">
                <h6 class="card-title">{{ $t('label.search.text') }}</h6>
            </div>
            <div class="card-body">
                <form @submit.prevent="listenSearchForm()">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="conditionSearch.keyword" id="keyword" class="form-control pr-5" />
                                <label for="keyword">{{ $t('label.search.keyword') }}</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="conditionSearch.phone" id="phone" class="form-control pr-5" />
                                <label for="phone">{{ $t('label.search.phone') }}</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="conditionSearch.parentName" id="parentName" class="form-control pr-5" />
                                <label for="parentName">{{ $t('label.search.parent') }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-primary float-end">{{ $t('label.search.text') }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="content p-0">
            <div class="d-flex mb-3">
                <TitleHeader :title="titlePage" />
            </div>
            <div class="table-content radius-20">
                <TablePatientComponent :headers="tableHeaders" :items="pageDto.content" :actionEdit="true" :actionDelete="true"
                    :routerPush="routerPush" :page="page" :size="size"
                />
                <Pagination
                    :page="page" :size="size" :pagination="pageDto"
                    @change-page="page = $event" @change-size="size = $event"
                />
            </div>
        </div>
    </div>
</template>
<script>
import {ref, reactive} from 'vue';
import TitleHeader from "~~/components/common/TitleHeader.vue";

import { ROLES } from "~~/constants/roles.js";
// import {useCurrentsRole} from "~~/services/common.js";
import TablePatientComponent from '~~/components/common/table/TablePatientComponent.vue';
import PatientService from "~~/services/model/patient.service";
import Pagination from '~~/components/common/table/Pagination.vue';

export default {
    components: {
        TitleHeader,
        TablePatientComponent,
        Pagination
    },
    data() {
        return {
            titlePage: "Quản lý danh sách bệnh nhân",
            routerPush: "/patient/form",
            btnTitle: "Thêm mới",
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
        const conditionSearch = reactive({
            keyword: "",
            phone: "",
            parentName: ""
        });
        
        const tableHeaders = [
            { text: "STT", value: "id", classCss: "hidden-xs" },
            { text: "Mã bệnh nhân", value: "code", classCss: "hidden-xs" },
            { text: "Tên bệnh nhân", value: "name", classCss: "radius-xs-top-left-20" },
            { text: "Số điện thoại", value: "phone" },
            { text: "Thông tin liên hệ", value: "dob", classCss: "text-center"},
            { text: "Bệnh án", classCss: "text-center"}
        ];

        const listenSearchForm = () => {
            if (page.value == 0) searchCallApi();
            else page.value = 0;
        }

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
                phone: conditionSearch.phone,
                parentName: conditionSearch.parentName
            };
            PatientService.search(criteria).then((response) => {
                let responseData = response.data;
                if (responseData) {
                    setPagination(responseData);
                }
            }).catch((error) => {
                $showToast("Tìm kiếm có lỗi!", "error", 2000);
                console.log("Error: ", error);
            });
        }

        watch([page, size], () => {
            searchCallApi();
        });

        return {
            ROLES,
            conditionSearch,
            tableHeaders,
            page, size,
            pageDto,

            // useCurrentsRole,
            listenSearchForm,
            searchCallApi
        }
    },
    created() {
        this.searchCallApi();
    }
}
</script>
<style lang="scss">
    
</style>