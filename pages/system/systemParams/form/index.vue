<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <SystemParamsForm />
  </div>
</template>
<script setup>
import SystemParamsForm from "~~/components/form/SystemParamsForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";

const titleForm = "Thêm tham số hệ thống";
</script>
<style lang="scss"></style>
