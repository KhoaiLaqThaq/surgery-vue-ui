<template>
  <div class="table-container">
    <div class="tr">
      <div class="th" v-for="(item, index) in headers" :key="index">
        {{ item.text }}
      </div>
      <div class="ms-0 me-0 text-center th" v-if="actionEdit || actionDelete">
        Hành động
      </div>
    </div>

    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td">{{ index + 1 }}</div>
      <div class="td">{{ item.paramName }}</div>
      <div class="td">{{ item.paramValue }}</div>
      <div class="td">{{ item.description }}</div>
      <div class="td">{{ item.type === "integer" ? "Integer" : "String" }}</div>
      <div class="td px-0 text-center" v-if="actionEdit || actionDelete">
        <div class="d-flex me-0">
          <div class="m-auto cursor-pointer"
            v-if="actionEdit && useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_SYS_PARAM_UPDATE])">
            <NuxtLink :to="routerPush + '/' + item.id" class="d-flex">
              <edit-icon /><span class="ms-1">Sửa</span>
            </NuxtLink>
          </div>
          <div class="d-flex me-3 cursor-pointer ms-3 text-danger" v-if="actionDelete">
            <delete-icon /><span class="ms-1">Xóa</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import { useCurrentsRole } from "~~/services/common.js"
import { ROLES } from "~~/constants/roles.js";

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: [
    "headers",
    "items",
    "routerPush",
    "actionEdit",
    "actionDelete",
    "page",
    "size",
  ],
  setup() {
    const currentRole = useCurrentRole();

    return {
      currentRole,
      ROLES,

      useCurrentsRole,
    }
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
