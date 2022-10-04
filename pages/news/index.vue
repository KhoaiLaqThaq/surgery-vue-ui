<template>
  <div class="mt-3">
    <div class="card">
      <div class="card-header search-header">
        <h6 class="card-title">Tìm kiếm</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="listenerSearchForm()">
          <div class="row">
            <div class="col-md-4">
              <div class="form-floating mb-3">
                <input type="text" v-model="keyword" id="keyword" class="form-control pr-5" />
                <label for="keyword">Tìm kiếm từ khóa...</label>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-floating mb-3">
                <input type="text" v-model="departmentName" id="departmentName" class="form-control pr-5" />
                <label for="departmentName">Tìm kiếm đơn vị thành viên...</label>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-floating">
                <select v-model="status" class="form-select">
                  <option v-for="(status, index) in newStatus" :key="index" :value="status.value">
                    {{ status.name }}
                  </option>
                </select>
                <label for="floatingSelect">Tìm kiếm theo trạng thái...</label>
              </div>
            </div>
          </div>

          <div class="row ms-auto">
            <div class="col-12 text-right">
              <button type="submit" class="btn btn-secondary text-small">
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="content-news">
      <div class="d-flex">
        <TitleHeader :title="title" />
        <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_NEWS_CREATE])"
          :textSize="'text-small'" :title="btnTitle" :routerPush="routerPush" class="ms-auto" />
      </div>
      <div class="table-content mt-3 radius-20">
        <table-news-component :headers="headers" :items="content" :actionEdit="true" :actionDelete="false" :page="page"
          :size="size" :sortField="sortField" :sortDirection="sortDirection"
          @change-sort-direction="sortDirection = $event" @change-sort-field="changeSortField($event)"
          @search-call-api="listenerSearchForm()"  
        />

        <pagination :page="page" :size="size" :number="number" :numberOfElements="numberOfElements"
          :totalElements="totalElements" :totalPages="totalPages" :first="first" :last="last"
          @change-page="page = $event" @change-size="size = $event" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import AddButton from "~~/components/common/AddButton.vue";
import TableNewsComponent from "~~/components/common/table/TableNewsComponent.vue";
import Pagination from "~~/components/common/table/Pagination.vue";
import { newStatus } from "~~/constants/enum.js";
import { useCurrentsRole } from "~~/services/common.js"

import { ROLES } from "~~/constants/roles.js";
import NewsService from "~~/services/model/news.service";

export default {
  components: {
    TitleHeader,
    AddButton,
    TableNewsComponent,
    Pagination,
  },
  data() {
    return {
      news: [],
      errors: [],
      routerPush: "/news/form",
      title: "Danh sách tin tức",
      btnTitle: "Thêm mới",
      newStatus: newStatus,
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
    const content = ref([]);
    const keyword = ref("");
    const departmentName = ref("");
    const status = ref("");
    const sortField = ref("id");
    const sortDirection = ref(true);
    const currentRole = useCurrentRole();

    const headers = [
      { text: "STT", value: "id" },
      { text: "Tiêu đề", value: "title" },
      { text: "Mô tả ngắn", value: "brief" },
      { text: "Ngày tạo", value: "createdDate" },
      { text: "Trạng thái", value: "status" },
    ];

    const listenerSearchForm = () => {
      if (page.value == 0) searchCallApi();
      else page.value = 0;
    };

    function setPagination(news) {
      content.value = news.content;
      page.value = news.page;
      size.value = news.size;
      number.value = news.number;
      numberOfElements.value = news.numberOfElements;
      totalPages.value = news.totalPages;
      totalElements.value = news.totalElements;
    }

    // call api
    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
        keyword: keyword.value,
        departmentName: departmentName.value,
        status: status.value,
        sortField: sortField.value,
        sortDirection: sortDirection.value,
      };
      // TODO: Call api
      NewsService.search(criteria).then((response) => {
          const responseData = response.data;
          if (responseData) setPagination(responseData);
        }).catch((e) => {
          this.errors.push(e);
        });
    }

    const changeSortField = (fieldValue) => sortField.value = fieldValue;

    watch([page, size, sortField, sortDirection], () => {
      searchCallApi();
    });

    return {
      headers,
      page,
      size,
      number,
      numberOfElements,
      totalPages,
      totalElements,
      first,
      last,
      content,
      keyword,
      sortField,
      sortDirection,
      departmentName,
      status,
      currentRole,
      ROLES,

      searchCallApi,
      changeSortField,
      useCurrentsRole,
      listenerSearchForm
    };
  },
  created() {
    // console.log("enter created()...");
    this.searchCallApi();
  },
};
</script>
<style lang="scss">
.input-suggest__event {
  position: relative;

  .btn-suggest {
    position: absolute;
    top: 0.25rem;
    right: 10px;
    border: 3px solid rgb(141, 141, 141);
    padding: 2px 4px;
    border-radius: 4px;
    background-color: rgb(168, 167, 167);
    color: #ffffff;
    font-weight: bold;
  }
}
</style>
