<template>
    <div class="mt-3">
        <div class="card">
            <div class="card-header search-header">
                <h6 class="card-title">Tìm kiếm</h6>
            </div>
            <div class="card-body">
                <form @submit.prevent="listenSearchForm()">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="conditionSearch.keyword" id="keyword" class="form-control pr-5" />
                                <label for="keyword">Tìm kiếm từ khóa...</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="conditionSearch.phone" id="phone" class="form-control pr-5" />
                                <label for="phone">Tìm kiếm số điện thoại...</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <input type="text" v-model="conditionSearch.parentName" id="parentName" class="form-control pr-5" />
                                <label for="parentName">Tìm kiếm tên người nhà...</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="content">
            <div class="d-flex mb-3">
                <TitleHeader :title="titlePage" />
                <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_NEWS_CREATE])"
                :textSize="'text-small'" :title="btnTitle" :routerPush="routerPush" class="ms-auto" />
            </div>
            <div class="table-content radius-20">
                <TablePatientComponent :headers="tableHeaders" :items="pageDto.content" :actionEdit="true" :actionDelete="true"
                    :routerPush="routerPush" :page="page" :size="size"
                />
                <Pagination :page="page" :size="size" :number="pageDto.number" :numberOfElements="pageDto.numberOfElements"
                    :totalPages="pageDto.totalPages" :totalElements="pageDto.totalElements" :last="pageDto.last" :first="pageDto.first"
                    @change-page="page = $event" @change-size="size = $event"
                />
            </div>
        </div>
    </div>
</template>
<script>
import {ref, reactive} from 'vue';
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";

import { ROLES } from "~~/constants/roles.js";
import {useCurrentsRole} from "~~/services/common.js";
import TablePatientComponent from '~~/components/common/table/TablePatientComponent.vue';
import PatientService from "~~/services/model/patient.service";
import Pagination from '~~/components/common/table/Pagination.vue';

export default {
    components: {
        TitleHeader,
        AddButton,
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
        const currentRole = useCurrentRole();
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
            { text: "STT", value: "id" },
            { text: "Mã bệnh nhân", value: "code" },
            { text: "Tên bệnh nhân", value: "name" },
            { text: "Ngày sinh", value: "dob"},
            { text: "Giới tính", value: "gender" },
            { text: "Phone", value: "phone" },
            { text: "Chi tiết"}
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
                $showToast("Tìm kiếm có lỗi!");
                console.log("Error: ", error);
            });
        }

        watch([page, size], () => {
            searchCallApi();
        });

        return {
            ROLES,
            conditionSearch,
            currentRole,
            tableHeaders,
            page, size,
            pageDto,

            useCurrentsRole,
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