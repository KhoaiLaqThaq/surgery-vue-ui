<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <NewsTypeForm />
  </div>
</template>
<script>
import NewsTypeForm from "~~/components/form/NewsTypeForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    NewsTypeForm,
    TitleHeader,
  },

  data() {
    return {
      titleForm: "Thêm mới loại tin tức",
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
