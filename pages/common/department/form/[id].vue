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
      titleForm: "Chỉnh sửa đơn vị",
    };
  }
};
</script>
<style lang="scss"></style>
