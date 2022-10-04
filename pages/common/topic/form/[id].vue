<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <TopicForm />
  </div>
</template>
<script>
import TopicForm from "~~/components/form/TopicForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    TopicForm,
    TitleHeader,
  },
  data() {
    return {
      titleForm: "Chỉnh sửa chuyên mục",
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
