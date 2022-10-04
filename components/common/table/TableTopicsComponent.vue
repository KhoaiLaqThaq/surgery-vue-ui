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
      <div class="td">{{ index + 1 + page * size }}</div>
      <div class="td">{{ item.name }}</div>
      <div class="td" v-if="actionEdit || actionDelete">
        <div class="d-flex">
          <div class="ms-auto cursor-pointer"
            v-if="actionEdit && useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_TOPIC_UPDATE])">
            <NuxtLink :to="'/common/topic/form/' + item.id" class="d-flex">
              <edit-icon /><span class="ms-1">Sửa</span>
            </NuxtLink>
          </div>
          <div class="d-flex me-auto cursor-pointer ms-3 text-danger"
            v-if="actionDelete && useCurrentsRole(currentRole,[ROLES.ROLE_ADMIN, ROLES.ROLE_TOPIC_DELETE])"
            data-bs-toggle="modal" :data-bs-target="'#' + modalSelectorId" @click="setItem(item)">
            <delete-icon />
            <span class="ms-1">Xóa</span>
          </div>
        </div>
      </div>
    </div>
    <ConfirmDelete :idModal="modalSelectorId" :objectName="topicConfirm.name" :objectType="objectType"
      :btnTitleConfirm="btnTitleConfirm" :issueText="issueText"
      :idObject="topicConfirm.id" @func-delete="deleteTopic(topicConfirm.id)"
    />
  </div>
</template>
<script>
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import { useCurrentsRole } from "~~/services/common.js"
import { ROLES } from "~~/constants/roles.js";
import TopicService from "~~/services/model/topic.service";
import ConfirmDelete from '~~/components/common/modal/ConfirmDelete.vue';

export default {
  components: {
    EditIcon,
    DeleteIcon,
    ConfirmDelete
  },
  props: ["headers", "items", "actionEdit", "actionDelete", "page", "size"],
  data() {
    return {
      modalSelectorId: "topicConfirmDelete",
      objectType: "chuyên mục",
      issueText: "Các bài viết thuộc chuyên mục bị xóa sẽ phải chọn chuyên mục khác trước khi lưu chỉnh sửa",
      btnTitleConfirm: "Tôi hiểu hậu quả, xóa chuyên mục này"
    }
  },
  setup() {
    const currentRole = useCurrentRole();
    const { $showToast } = useNuxtApp();
    const topicConfirm = reactive({
      id: "",
      name: ""
    });
    function setItem(topic) {
      if (topic) {
        topicConfirm.id = topic.id;
        topicConfirm.name = topic.name;
      }
    }
    function deleteTopic(topicId) {
      if(topicId) {
        TopicService.deleteById(topicId)
          .then(response => {
            let data = response.data;
            if (data) {
              if (data.code == 200) {
                $showToast("Xóa chuyên mục thành công!", "success", 3000);
                location.reload();
              } else {
                
                $showToast("Xóa chuyên mục không thành công!", "error", 3000);
              }
            }
          })
          .catch(error => {
            $showToast("Xóa chuyên mục không thành công!", "error", 3000);
            console.log(error.toString());
          })
          ;
      }
    }
    return {
      topicConfirm,
      currentRole,
      ROLES,

      deleteTopic,
      useCurrentsRole,
      setItem
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
