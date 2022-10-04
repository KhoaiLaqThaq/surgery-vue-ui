<template>
  <div class="table-container">
    <div class="tr">
      <div class="th" v-for="(item, index) in headers" :key="index">
        {{ item.text }}
      </div>
      <div class="th text-center" v-if="actionEdit || actionDelete">
        Hành động
      </div>
    </div>
    <div class="tr" v-for="(item, index) in items" :key="index">
      <div class="td">{{ index + 1 }}</div>
      <div class="td">{{ item.code }}</div>
      <div class="td">{{ item.name }}</div>
      <div class="td" v-if="actionEdit || actionDelete">
        <div class="d-flex">
          <div class="cursor-pointer" :class="actionDelete ? 'ms-auto':'m-auto'" v-if="actionEdit">
            <NuxtLink :to="'/common/newsType/form/' + item.id" class="d-flex">
              <edit-icon /><span class="ms-1">Sửa</span>
            </NuxtLink>
          </div>
          <div
            class="d-flex me-auto cursor-pointer ms-3 text-danger"
            v-if="actionDelete"
            @click="deleteType(item.id)"
          >
            <delete-icon />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import axios from 'axios';
import CONFIG from '~~/config';

export default {
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: ["headers", "items", "actionEdit", "actionDelete"],
  setup() {
    const header = useHeader();
    function deleteType(typeId) {
      let tokenHeader = {
        'Authorization': header.value,
        'Content-Type': 'application/json'
      };
      axios.delete(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/newsType/${typeId}`, {headers: tokenHeader})
        .then(response => {
          let data = response.data;
          console.log(data);
          if (data) {
            if (data.code == 200) {
              // navigateTo("/common/topic");
              location.reload();
            } else {
              console.log("ERROR: " + data.code);
            }
          }
        })
        .catch(error => {
          console.log(error.toString());
        })
      ;
    }
    return {
      deleteType
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
