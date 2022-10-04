<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <AddButton v-if="useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN, ROLES.ROLE_GROUP_USER_CREATE])" class="mb-4" :title="btnTitle" :routerPush="routerPush" />
    <div class="col-12 table-content">
      <TableComponent
        :headers="tableHeader"
        :items="groups"
        :actionEdit="true"
        :page="page"
        :size="size"
        :routerPush="routerPush"
      />
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableGroupsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";

import { useCurrentsRole } from "~~/services/common.js";
import {ROLES} from "~~/constants/roles.js";
import CONFIG from "~~/config";
import axios from "axios";
import UserService from "~~/services/model/user.service";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách nhóm quyền",
      btnTitle: "Thêm mới",
      routerPush: "/system/group/form",
    };
  },
  setup() {
    const header = useHeader();
    const currentRole = useCurrentRole();
    const tableHeader = [
      { text: "STT", value: "no" },
      { text: "Tên nhóm quyền", value: "name" },
    ];

    const groups = ref([]);
    const page = ref(0);
    const size = ref(10);

    function searchCallApi() {
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json'
      };
      axios
        // .get(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/groups`, { headers: tokenHeader })
        UserService.getAllGroup()
        .then((response) => {
          const data = response.data;
          console.log(data);
          groups.value = data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }

    return {
      tableHeader,
      groups,
      page,
      size,
      ROLES,

      currentRole,
      useCurrentsRole,
      searchCallApi,
    };
  },
    created() {
      this.searchCallApi();
    },
};
</script>
<style lang=""></style>
