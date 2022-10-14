<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="'Danh sách người dùng'" />
      <AddButton :textSize="'text-small'" :title="'Thêm mới'" :routerPush="routerPush" class="ms-auto" />
    </div>

    <div class="table-content mt-3">
      <table-component :headers="tableHeaders" :items="pageDto.content" :actionEdit="true" :actionDelete="true" :page="page" :size="size" :routerPush="routerPush" />
      <pagination :page="page" :size="size" :pagination="pageDto" @change-page="page = $event" @change-size="size = $event" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import BaseInput from "~~/components/common/BaseInput.vue";
import TableComponent from "~~/components/common/table/TableUsersComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";
import UserService from "~~/services/model/user.service";

export default {
  components: { TitleHeader, AddButton, BaseInput, TableComponent, Pagination },
  data() {
    const tableHeaders = [
      { text: "STT", value: "no", classCss: "hidden-xs" },
      { text: "Tên đăng nhập", value: "username" },
      { text: "Email", value: "email", classCss: "hidden-xs" },
      { text: "Họ & Tên", value: "fullname" },
      { text: "Trạng thái", value: "accountEnabled" }
    ];

    return {
      routerPush: "/system/user/form",
      tableHeaders
    };
  },
  setup() {
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

    const listenerSearchForm = () => {
      if (page.value == 0) searchCallApi();
      else page.value = 0;
    };
    watch([page, size], () => searchCallApi());

    function setPagination(users) {
      page.value = users.page;
      size.value = users.size;
      pageDto.content = users.content;
      pageDto.number = users.number;
      pageDto.numberOfElements = users.numberOfElements;
      pageDto.totalPages = users.totalPages;
      pageDto.totalElements = users.totalElements;
      pageDto.first = users.first;
      pageDto.last = users.last;
    }

    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value
      };
      // TODO: Call api
      UserService.search(criteria)
      .then((response) => {
        const responseData = response.data;
        setPagination(responseData);
      })
      .catch((e) => {

        console.log("Error: ", e);
      });
    }

    return {
      page,
      size,
      pageDto,

      listenerSearchForm,
      searchCallApi
    };
  },
  created() {
    this.searchCallApi();
  },
};
</script>

<style lang=""></style>
