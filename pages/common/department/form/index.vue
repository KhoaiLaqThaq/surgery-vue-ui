<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <DepartmentForm />
  </div>
</template>
<script>
import DepartmentForm from "~~/components/form/DepartmentForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    DepartmentForm,
    TitleHeader,
  },

  data() {
    return {
      titleForm: "Thêm đơn vị thành viên",
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
