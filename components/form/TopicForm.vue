<template>
  <Form @submit="onSubmit()">
    <div class="row mt-3">
      <div class="col-8">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box mb-2" v-model="name" name="name" :rules="validateName" />
          <ErrorMessage name="name" class="text-danger" />
          <label for="">Tên chuyên mục <span class="text-danger">*</span></label>
        </div>
        <BaseButton class="btn-primary ms-auto" :btnType="'submit'" :name="'Lưu'" :textSize="'text-small'" />
      </div>
    </div>
  </Form>
</template>
<script>
import { ref } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute } from "vue-router";

import TopicService from "~~/services/model/topic.service";
export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  data() {
    return {
      titleAdd: "Thêm mới chuyên mục",
      titleEdit: "Chỉnh sửa chuyên mục",
    };
  },
  setup() {
    const route = useRoute();
    const name = ref("");
    const topicId = ref(route.params.id);
    const topicExist = ref({});
    const { $showToast } = useNuxtApp();

    // call api getById
    function callApiGetById() {
      if (topicId.value) {
        TopicService.getById(topicId.value)
          .then((response) => {
            if (response.data) {
              topicExist.value = response.data;
            }
          })
          .catch((error) => {
            $showToast("Tải chuyên mục không thành công!", "error", 3000);
            console.log(error);
          });
      }
    }

    watch(topicExist, () => {
      if (topicExist.value) {
        name.value = topicExist.value.name;
      }
    });

    function validateName(value) {
      if (!value) {
        return "Trường này là bắt buộc";
      }

      if (value.length < 3)
        return "Trường này phải có hơn 3 ký tự";
      return true;
    }

    //Call post API topic
    function onSubmit() {
      const topic = {
        id: topicId.value,
        name: name.value,
      };
      TopicService.saveOrUpdate(topic)
        .then((res) => {
          let responseData = res.data;
          if (responseData) {
            $showToast("Lưu chuyên mục thành công!", "success", 3000);
            navigateTo("/common/topic");
          }
        })
        .catch((error) => {
          $showToast("Lưu chuyên mục không thành công!", "error", 3000);
          console.log(error);
        });
    }
    return {
      name,
      onSubmit,
      validateName,
      callApiGetById,
    };
  },
  created() {
    this.callApiGetById();
  },
};
</script>
<style lang="scss"></style>
