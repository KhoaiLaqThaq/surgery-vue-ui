<template>
  <div class="mt-3">
    <div class="d-flex mb-3">
      <TitleHeader :title="titleForm" />
      <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_DEPARTMENT_CREATE])" class="ms-auto"
        :textSize="'text-small'" :title="btnTitle" :routerPush="routerPush" />
    </div>

    <div class="col-12 table-content">
      <TableDepartmentComponent :headers="tableHeader" :items="departments" :actionEdit="true" :actionDelete="false"
        :routerPush="routerPush" />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableDepartmentComponent from "~~/components/common/table/TableDepartmentComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";
import { useCurrentsRole } from "~~/services/common.js"

// import CONFIG from "~~/config";
import { ROLES } from "~~/constants/roles.js";
// import axios from "axios";
import DepartmentService from "~~/services/model/department.service";

export default {
  components: { TitleHeader, AddButton, TableDepartmentComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách đơn vị",
      btnTitle: "Thêm mới",
      routerPush: "/common/department/form/",
    };
  },
  setup() {
    const tableHeader = [
      { text: "STT", value: "no" },
      { text: "Mã đơn vị thành viên", value: "code" },
      { text: "Tên đơn vị thành viên", value: "name" },
    ];
    const departments = ref([]);
    const currentRole = useCurrentRole();
    // call api
    function searchCallApi() {
      DepartmentService.getAll()
        .then((response) => {
            const data = response.data;
            departments.value = data;
          })
          .catch((e) => {
            this.errors.push(e);
          });
    }

    return {
      tableHeader,
      departments,
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
