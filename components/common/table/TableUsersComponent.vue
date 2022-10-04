<template>
  <div class="table-container">
    <div class="tr">
      <div class="th" :id="item.value" v-for="(item, index) in headers" :key="index">
        {{ item.text }}
      </div>
      <div class="text-center th" v-if="actionEdit || actionDelete">
        Hành động
      </div>
    </div>
    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td text-center">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.username }}</div>
      <div class="td">{{ item.email }}</div>
      <div class="td">{{ item.firstName }}</div>
      <div class="td">{{ item.lastName }}</div>
      <div class="td">
        <template v-if="item.enabled == true"><span class="badge bg-success">Active</span></template>
        <template v-if="item.enabled == false"><span class="badge bg-warning">Inactive</span></template>
      </div>
      <div class="td">{{ item.groupName }}</div>

      <div class="td" v-if="actionEdit || actionDelete">
        <div class="d-flex">
          <div class="ms-auto cursor-pointer" v-if="actionEdit && useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN, ROLES.ROLE_USER_UPDATE])">
            <NuxtLink :to="routerPush + '/' + item.k6kUserId" class="d-flex">
              <edit-icon /><span class="ms-1">Sửa</span>
            </NuxtLink>
          </div>
          <div class="d-flex me-auto cursor-pointer ms-3 text-danger" 
            v-if="actionDelete && useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN, ROLES.ROLE_USER_DELETE])"
            data-bs-toggle="modal" :data-bs-target="'#' + modalSelectorId" @click="setItem(item)"
          >
            <delete-icon />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </div>
    </div>
    <ConfirmDelete :idModal="modalSelectorId" :objectName="userConfirm.username" :objectType="objectType"
      :btnTitleConfirm="btnTitleConfirm" :issueText="issueText"
      :idObject="userConfirm.k6kUserId" @func-delete="deleteUser(userConfirm.k6kUserId)"
    />
  </div>
</template>
<script>
import { ref, reactive } from 'vue';
import moment from "moment";
import { useCurrentsRole } from "~~/services/common.js"

import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import { ROLES } from "~~/constants/roles.js";
import UserService from "~~/services/model/user.service";
import UserDepartService from "~~/services/model/userDepart.service";
import ConfirmDelete from '~~/components/common/modal/ConfirmDelete.vue';

import { HttpStatus } from "~~/constants/http-status";

export default {
  components: {
    EditIcon,
    DeleteIcon,
    ConfirmDelete
},
  props: ["headers", "items", "actionEdit", "actionDelete", "page", "size", "routerPush", "searchCallApi"],
  data() {
    return {
      modalSelectorId: "userConfirmDelete",
      objectType: "tài khoản",
      issueText: "Các vấn đề, nhận xét, bình luận, quy trình làm việc và các liên kết của tài khoản",
      btnTitleConfirm: "Tôi hiểu hậu quả, xóa tài khoản này"
    }
  },
  setup(props, { emit }) {
    const sortField = ref(props.sortField);
    const sortDirection = ref(props.sortDirection);
    const currentRole = useCurrentRole();
    const header = useHeader();
    const { $showToast } = useNuxtApp();
    const userConfirm = reactive({
      k6kUserId: "",
      username: ""
    });

    let headers = {
      'Authorization': header.value,
      'Content-Type': 'application/json'
    };

    function displayBrief(brief) {
      let maxLength = 125;
      if (brief.length > maxLength) {
        return brief.slice(0, maxLength).concat("...");
      }
      return brief;
    }

    const displayDate = (date) => moment(date).month(date[1] - 1).format("YYYY-MM-DD HH:mm:ss");

    function setItem(user) {
      if (user) {
        userConfirm.k6kUserId = user.k6kUserId;
        userConfirm.username = user.username;
      }
    }

    function searchCondition(fieldValue) {
      if (sortField.value === fieldValue) {
        // change sort direction
        sortDirection.value = !sortDirection.value
        emit('change-sort-direction', sortDirection.value);
      } else {
        // change sort field & reset sort direction
        sortField.value = fieldValue;
        emit('change-sort-field', fieldValue);
      }
      // change ui
      let fieldSet = document.getElementById(fieldValue);
      fieldSet.classList.remove('sorting', sortDirection.value ? 'sorting_asc' : 'sorting_desc');
      fieldSet.classList.add(sortDirection.value ? 'sorting_desc' : 'sorting_asc');
      // reset other columns
      resetOtherColumns(fieldValue);
    }

    function resetOtherColumns(idSelector) {
      let otherSelectors = document.getElementsByClassName('th');
      for (let i = 0; i < otherSelectors.length - 1; i++) {
        const element = otherSelectors[i];
        if (element.id != idSelector) {
          element.classList.add('sorting');
          element.classList.remove('sorting_desc', 'sorting_asc');
        }
      }
    }

    function deleteUser(k6kUserId) {
      if (k6kUserId) {
        UserService.deleteById(k6kUserId)
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            if (responseData.code == HttpStatus.ACCEPTED || responseData.code == HttpStatus.NOT_FOUND) {
              deleteUserDepartment(k6kUserId);
            } else {
              onLoadUserError("Ops! Xóa người dùng không thành công -1");
            }
          } 
        })
        .catch((error) => {
          onLoadUserError("Ops! Xóa người dùng không thành công -1");
          console.log("ERROR DELETE USER K6K: ", error);
        })
      }
    }

    function deleteUserDepartment(k6kUserId) {
      UserDepartService.deleteById(k6kUserId)
      .then((response) => {
        let responseData = response.data;
        if (responseData) {
          $showToast("Xóa người dùng thành công!", "success", 3000);

          setTimeout(() => {
            location.reload();
          }, 2000);

        } else {
          onLoadUserError("Ops! Xóa người dùng không thành công -2");
        }
      })
      .catch((error) => {
        onLoadUserError("Ops! Xóa người dùng không thành công -2");
        console.log("ERROR DELETE USER K6K: ", error);
      })
    }

    function onLoadUserError(message) {
      $showToast(message, "error", 3000);
    }

    return {
      userConfirm,
      currentRole,
      ROLES,

      displayBrief,
      displayDate,
      searchCondition,
      useCurrentsRole,
      deleteUser,
      setItem
    };
  },
};
</script>
<style lang="scss">
.table {
  tr {
    th {
      // text-transform: uppercase;

      &:hover {
        background-color: rgb(241 245 249);
      }
    }
  }
}
</style>
