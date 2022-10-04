<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <GroupForm />
  </div>
</template>
<script>
import GroupForm from "~~/components/form/GroupForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
export default {
  components: {
    GroupForm,
    TitleHeader,
  },

  data() {
    return {};
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
