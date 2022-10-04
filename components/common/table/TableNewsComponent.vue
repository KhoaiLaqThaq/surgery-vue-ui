<template>
  <div class="table-container">
    <div class="tr">
      <!-- <div class="th">#</div> -->
      <div class="th sorting" :id="item.value" v-for="(item, index) in headers" :key="index"
        @click="searchCondition(item.value)">
        {{ item.text }}
      </div>
      <div class="th pe-3" v-if="actionEdit || actionDelete">Hành động</div>
    </div>

    <div class="tr" v-for="(item, index) in items" :key="index">
      <!-- <div class="td px-3"><input type="checkbox" /></div> -->
      <div class="td text-center">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.title }}</div>
      <div class="td">{{ displayBrief(item.brief) }}</div>
      <div class="td">{{ displayDate(item.createdDate) }}</div>
      <div class="td px-4">
        <template v-if="item.status == '1'"><span class="badge bg-pending">Chưa phê duyệt</span></template>
        <template v-if="item.status == '2'"><span class="badge bg-success">Đã phê duyệt</span></template>
      </div>
      <td class="td" v-if="actionEdit || actionDelete">
        <div class="action-group d-flex">
          <NuxtLink class="cursor-pointer" :to="'/news/form/' + item.id"
            v-if="actionEdit && useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_NEWS_EDIT])">
            <edit-icon /><span class="ms-1">Sửa</span>
          </NuxtLink>
          <div v-if="actionDelete && useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_NEWS_DELETE])" class="ms-3 cursor-pointer text-danger">
            <delete-icon @click="disabledNews(item.id)" />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </td>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import moment from "moment";
import { useCurrentsRole } from "~~/services/common.js"

import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import {ROLES} from "~~/constants/roles.js";

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: [
    "headers",
    "items",
    "actionEdit",
    "actionDelete",
    "page",
    "size",
    "sortField",
    "sortDirection"
  ],
  setup(props, { emit }) {
    const sortField = ref(props.sortField);
    const sortDirection = ref(props.sortDirection);
    const currentRole = useCurrentRole();


    function displayBrief(brief) {
      let maxLength = 125;
      if (brief.length > maxLength) {
        return brief.slice(0, maxLength).concat("...");
      }
      return brief;
    }

    const displayDate = (date) => moment(date).month(date[1] - 1).format("YYYY-MM-DD HH:mm:ss");

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

    return {
      currentRole,
      ROLES,

      displayBrief,
      displayDate,
      searchCondition,
      useCurrentsRole,
    };
  },
};
</script>
<style lang="scss">

</style>
