<template>
  <Form @submit="onSubmit()">
    <div class="row mt-3">
      
      <div class="col-4">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box" v-model="newsType.code" name="code" 
            :rules="validateName" @keyup="checkNewsTypeExistByCode()" />
          <div class="mt-1 p-1">
            <ErrorMessage name="code" class="text-danger" />
            <p id="codeMessage" class="text-danger"></p>
          </div>

          <label for="">Mã loại tin tức <span class="text-danger">*</span></label>
        </div>
      </div>
      <div class="col-8">
        <!-- title -->
        <div class="form-floating mb-3">
          <Field
            type="text"
            class="form-control box"
            v-model="newsType.name"
            name="name"
            :rules="validateName"
          />

          <div class="mt-1 p-1">
            <ErrorMessage name="name" class="text-danger" />
          </div>

          <label for="">Tên loại tin tức <span class="text-danger">*</span></label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 ms-auto">
        <BaseButton class="btn-primary ms-auto" :btnType="'submit'" id="btnSubmit" :name="'Lưu'" :textSize="'text-small'" />
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, reactive } from "vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute } from "vue-router";

import NewsTypeService from "~~/services/model/newsType.service";

export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  data() {
    return {
      titleAdd: "Thêm mới loại tin tức",
      titleEdit: "Chỉnh sửa loại tin tức",
    };
  },
  setup() {
    const route = useRoute();
    const { $showToast } = useNuxtApp();
    const newsType = reactive({
      code: "",
      name: ""
    });
    
    const typeId = ref(route.params.id);
    const typeExist = ref({});

    const notiCaseError = (message) => $showToast(message, "error", 2000);

    // call api getById
    function callApiGetById() {
      if (typeId.value) {
        NewsTypeService.getById(typeId.value).then((response) => {
            if (response.data) {
              typeExist.value = response.data;
            }
          })
          .catch((error) => {
            notiCaseError("Tải loại tin tức không thành công!");
            console.log(error)
          })
      }
    }

    watch(typeExist, () => {
      if (typeExist.value) {
        newsType.code = typeExist.value.code;
        newsType.name = typeExist.value.name;
      }
    });

    function validateName(value) {
      // if the field is empty
      if (!value) {
        return "Trường này là bắt buộc";
      }
      // if the field is not a valid email
      if (value.length < 3)
        return "Trường này phải có hơn 3 ký tự";
      // All is good
      return true;
    }

    function checkNewsTypeExistByCode() {
      if (newsType.code && newsType.code.length > 3) {
        NewsTypeService.checkExistByCode(newsType.code).then((response) => {
          let responseData = response.data;
          let codeSelector = document.getElementById("codeMessage");
          let btnSubmit = document.getElementById("btnSubmit");
          if (responseData) {
            codeSelector.innerText = "Mã phòng ban đã tồn tại!";
            btnSubmit.disabled = true;
          } else {
            if (codeSelector && codeSelector.textContent && codeSelector.textContent.length > 0) {
              btnSubmit.disabled = false;
              codeSelector.innerText = "";
            }
          }
        }).catch((e) => {
          notiCaseError("Kiểm tra loại tin tức tồn tại không thành công!");
          console.log("CHECK ERROR: ", e);
        });
      }
    }

    //Call post API topic
    function onSubmit() {
      const type = {
        id: typeId.value,
        code: newsType.code,
        name: newsType.name,
      };
      NewsTypeService.saveOrUpdate(type).then((res) => {
          let responseData = res.data;
          if (responseData) {
            $showToast("Lưu loại tin tức thành công", "success", 2000);
            navigateTo("/common/newsType");
          }
        })
        .catch((error) => {
          $showToast("Lưu loại tin tức không thành công", "error", 2000);
          console.log(error);
        });
    }
    return {
      newsType,
      onSubmit,
      validateName,
      callApiGetById,
      checkNewsTypeExistByCode
    };
  },
  created() {
    this.callApiGetById();
  },
};
</script>
<style lang="scss"></style>
