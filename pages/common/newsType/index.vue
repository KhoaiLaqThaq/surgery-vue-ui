<template>
  <div class="mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <AddButton
        class="ms-auto mb-4"
        :title="btnTitle"
        :routerPush="routerPush"
      />
    </div>
    <div class="col-12 table-content">
      <TableComponent
        :headers="tableHeader"
        :items="newsTypes"
        :actionEdit="true"
        :actionDelete="false"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableComponent from "~~/components/common/table/TableNewsTypeComponent.vue";

import NewsTypeService from "~~/services/model/newsType.service";

export default {
  components: { TitleHeader, AddButton, TableComponent },
  data() {
    return {
      titleForm: "Danh sách loại tin tức",
      btnTitle: "Thêm mới",
      routerPush: "/common/newsType/form",
    };
  },
  setup() {
    const newsTypes = ref([]);
    const { $showToast } = useNuxtApp();

    const tableHeader = [
      { text: "STT", value: "no" },
      { text: "Mã", value: "code" },
      { text: "Tên loại tin tức", value: "name" },
    ];

    // call api
    function searchCallApi() {
      NewsTypeService.getAll().then((response) => {
          const responseData = response.data;
          if (responseData) newsTypes.value = responseData;
        })
        .catch((e) => {
          $showToast("Tải loại tin tức thất bại", "error", 2000);
          console.log(e);
        });
    }

    return {
      tableHeader,
      newsTypes,

      searchCallApi,
    };
  },
  created() {
    this.searchCallApi();
  },
};
</script>
<style lang=""></style>
