<template>
  <div class="content-news mt-3">
    <GroupForm />
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import GroupForm from "~~/components/form/GroupForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    GroupForm,
    TitleHeader,
  },
  data() {
    return {
      titleForm: "Chỉnh sửa nhóm quyền",
    };
  },
  setup() {
    // define variables
    return {
      //   addNews,
    };
  },
  mounted() {},
};
</script>
<style lang="scss"></style>
