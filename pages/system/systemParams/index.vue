<template>
  <div class="mt-3">
    <div class="card">
      <div class="card-header search-header">
        <h6 class="card-title">Tìm kiếm</h6>
      </div>
      <div class="card-body pb-0">
        <form @submit.prevent="searchCallApi()">
          <div class="row">
            <div class="col-10">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="keyword">
                <label for="">Tìm kiếm từ khóa...</label>
              </div>
            </div>
            <div class="col-2 text-right">
              <button type="submit" class="btn btn-secondary text-small">
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_SYS_PARAM_CREATE])" class="ms-auto mb-4"
        :title="btnTitle" :routerPush="routerPush" />
    </div>
    
    <div class="col-12 table-content">
      <TableComponent :headers="tableHeader" :items="systemParams" :actionEdit="true" :actionDelete="false"
        :routerPush="routerPush" />
      <Pagination :page="page" :size="size" :number="number" :numberOfElements="numberOfElements"
        :totalPages="totalPages" :totalElements="totalElements" :first="first" :last="last"
        @change-page="page = $event" @change-size="size = $event"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableParamsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import { useCurrentsRole } from "~~/services/common.js"
import { ROLES } from "~~/constants/roles.js";
import SystemParamService from "~~/services/model/systemParam.service";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination, Pagination },
  data() {
    return {
      titleForm: "Danh sách tham số hệ thống",
      btnTitle: "Thêm mới",
      routerPush: "/system/systemParams/form",
    };
  },
  setup() {
    const page = ref(0);
    const size = ref(10);
    const number = ref(0);
    const numberOfElements = ref(10);
    const totalPages = ref(0);
    const totalElements = ref(0);
    const first = ref(false);
    const last = ref(false);

    const keyword = ref("");

    const { $showToast } = useNuxtApp();
    const systemParams = ref([]);
    const currentRole = useCurrentRole();

    const tableHeader = [
      { text: "STT", value: "id" },
      { text: "Tên tham số", value: "paramName" },
      { text: "Giá trị", value: "paramValue" },
      { text: "Ý nghĩa", value: "description" },
      { text: "Kiểu giá trị", value: "type" },
    ];
    
    // call api
    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
        keyword: keyword.value,
      };

      SystemParamService.search(criteria).then((response) => {
          const responseData = response.data;
          if (responseData) {
            setPagination(responseData);
          }
        })
        .catch((e) => {
          $showToast("Xảy ra lỗi tìm kiếm", "error", 3000);
          console.log("SEARCH ERROR: ", e);
        });
    }

    function setPagination(systemParam) {
      systemParams.value = systemParam.content;
      page.value = systemParam.page;
      size.value = systemParam.size;
      number.value = systemParam.number;
      numberOfElements.value = systemParam.numberOfElements;
      totalPages.value = systemParam.totalPages;
      totalElements.value = systemParam.totalElements;
      first.value = systemParam.first;
      last.value = systemParam.last;
    }

    watch([page, size], () => {
      searchCallApi();
    });

    return {
      page, size, number, numberOfElements, totalPages, totalElements, first, last,

      keyword,
      tableHeader,
      systemParams,
      currentRole,
      ROLES,
      searchCallApi,
      useCurrentsRole,
    };
  },
  mounted() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
