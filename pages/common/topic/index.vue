<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_TOPIC_CREATE])" class="ms-auto mb-4"
        :title="btnTitle" :routerPush="routerPush" />
    </div>
    <div class="col-12 table-content">
      <TableComponent :headers="tableHeader" :items="topics" :actionEdit="true" :actionDelete="true" :page="page"
        :size="size" />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableTopicsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";
import { useCurrentsRole } from "~~/services/common.js"

import { ROLES } from "~~/constants/roles.js";
import TopicService from "~~/services/model/topic.service";

export default {
  components: { TitleHeader, AddButton, TableComponent, Pagination },
  data() {
    return {
      titleForm: "Danh sách chuyên mục",
      btnTitle: "Thêm mới",
      routerPush: "/common/topic/form",
    };
  },
  setup() {
    const tableHeader = [
      { text: "STT", value: "no" },
      { text: "Tên chuyên mục", value: "name" },
    ];

    const topics = ref([]);
    const page = ref(0);
    const size = ref(10);
    const currentRole = useCurrentRole();

    function setPagination(data) {
      topics.value = data;
    }
    // call api
    function searchCallApi() {
      TopicService.getAll().then((response) => {
          const responseData = response.data;
          if (responseData)
            setPagination(responseData);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return {
      tableHeader,
      topics,
      page,
      size,
      currentRole,
      ROLES,

      searchCallApi,
      useCurrentsRole,
    };
  },
  created() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
