<template>
  <div class="mt-3">
    <div class="card">
      <div class="card-header search-header">
        <h6 class="card-title">Tìm kiếm</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="listenerSearchForm()">
          <div class="row">
            <div class="col-md-3">
              <div class="form-floating mb-3">
                <input type="text" v-model="username" id="username" class="form-control pr-5" />
                <label for="username">Tìm kiếm username...</label>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-floating mb-3">
                <input type="text" v-model="email" id="email" class="form-control pr-5" />
                <label for="email">Tìm kiếm email...</label>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-floating mb-3">
                <input type="text" v-model="groupName" id="groupName" class="form-control pr-5" />
                <label for="groupName">Tìm kiếm nhóm...</label>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-floating">
                <select v-model="accountEnabled" class="form-select">
                  <option v-for="(accountEnabled, index) in userStatus" :key="index" :value="accountEnabled.value">
                    {{ accountEnabled.name }}
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
    <div class="d-flex">
      <TitleHeader :title="title" />
      <AddButton v-if="useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_USER_CREATE])"
      :textSize="'text-small'" :title="'Thêm mới'" :routerPush="routerPush" class="ms-auto" />
    </div>

    <div class="table-content mt-3">
      <table-component :headers="tableHeaders" :items="content" :actionEdit="true" :actionDelete="true" :page="page" :size="size" :routerPush="routerPush" />

      <pagination :page="page" :size="size" :number="number" :numberOfElements="numberOfElements" :totalElements="totalElements" 
        :totalPages="totalPages" :first="first" :last="last" @change-page="page = $event" @change-size="size = $event" />
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
import { userStatus } from "~~/constants/enum.js";
import { useCurrentsRole } from "~~/services/common.js";
import { ROLES } from "~~/constants/roles.js";
import axios from "axios";
import NewsDepartService from "~~/services/model/userDepart.service";

export default {
  components: {
    TitleHeader,
    AddButton,
    BaseInput,
    TableComponent,
    Pagination,
  },
  data() {
    return {
      title: "Danh sách người dùng",
      users: [],
      errors: [],
      themeColor: "#1e40af",
      routerPush: "/system/user/form",
      userStatus: userStatus,
    };
  },
  setup() {
    const page = ref(0);
    const size = ref(10);
    const number = ref(0);
    const numberOfElements = ref(10);
    const totalPages = ref(3);
    const totalElements = ref(30);
    const first = ref(false);
    const last = ref(false);
    const content = ref([]);
    const groupName = ref("");
    const username = ref("");
    const email = ref("");
    const accountEnabled = ref("");
    const departmentId = ref("");
    const header = useHeader();
    const currentRole = useCurrentRole();

    const listenerSearchForm = () => page.value = 0;

    //const currentPage = ref(0);
    const tableHeaders = [
      { text: "STT", value: "no" },
      { text: "Tên đăng nhập", value: "username" },
      { text: "Email", value: "email" },
      { text: "Họ", value: "lastName" },
      { text: "Tên", value: "firstName" },
      { text: "Trạng thái", value: "accountEnabled" },
      { text: "Nhóm", value: "groupName" },
    ];

    function setPagination(users) {
      content.value = users.content;
      page.value = users.page;
      size.value = users.size;
      number.value = users.number;
      numberOfElements.value = users.numberOfElements;
      totalPages.value = users.totalPages;
      totalElements.value = users.totalElements;
    }

    

    function searchCallApi() {
      let criteria = {
        page: page.value,
        size: size.value,
        username: username.value,
        email: email.value,
        groupName: groupName.value,
        enabled: accountEnabled.value,
        departmentId: departmentId.value,
      };
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json',
      };
      // TODO: Call api
      axios
        // .post(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/userDepartments`, criteria, { headers: tokenHeader })
        NewsDepartService.search(criteria, { headers: tokenHeader })
        .then((response) => {
          const data = response.data;
          setPagination(data);
        })
        .catch((e) => {
          this.errors.push(e);
        });
    }

    watch([page, size], () => {
      searchCallApi();
    });
    return {
      tableHeaders,
      page,
      size,
      numberOfElements,
      number,
      totalPages,
      totalElements,
      first,
      last,
      content,
      username,
      email,
      groupName,
      accountEnabled,
      departmentId,
      currentRole,
      ROLES,

      listenerSearchForm,
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
