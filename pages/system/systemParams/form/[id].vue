<template>
  <div class="content-news mt-3">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
    </div>
    <SystemParamsForm :id="systemParamId" :systemParam="systemParam" />
  </div>
</template>
<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import SystemParamsForm from "~~/components/form/SystemParamsForm.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";

import SystemParamService from "~~/services/model/systemParam.service";

export default {
  components: {
    SystemParamsForm,
    TitleHeader,
  },
  setup() {
    const { $showToast } = useNuxtApp();
    const route = useRoute();
    const systemParamId = ref(route.params?.id);
    const systemParam = ref({});

    function getSystemParamById() {
      if (systemParamId.value) {
        SystemParamService.getById(systemParamId.value)
        .then((response) => {
          let responseData = response.data;
          if (responseData) systemParam.value = responseData;
        })
        .catch((error) => {
          $showToast("Tải tham số hệ thống không thành công!", "error", 2000);
          console.log("Error: ", error);
        });
      }
    }

    return {
      titleForm: "Chỉnh sửa tham số hệ thống",
      systemParamId,
      systemParam,

      getSystemParamById
    };
  },
  created() {
    this.getSystemParamById();
  }
};
</script>
<style lang="scss"></style>
