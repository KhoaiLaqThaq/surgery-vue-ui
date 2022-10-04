<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <SystemParamsForm />
  </div>
</template>
<script>
import SystemParamsForm from "~~/components/form/SystemParamsForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    SystemParamsForm,
    TitleHeader,
  },

  data() {
    return {
      titleForm: "Thêm tham số hệ thống",
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
