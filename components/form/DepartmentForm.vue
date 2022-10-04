<template>
  <Form @submit="onSubmit()">
    <div class="row mb-3">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <!-- code -->
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box mb-2" v-model="department.code" name="code" 
            :rules="validateName" :disabled="departmentId" @keyup="checkDepartmentExistByCode()" />
          <ErrorMessage name="code" class="text-danger" />
          <p id="codeMessage" class="text-danger"></p>
          <label for="">Mã đơn vị <span class="text-danger">*</span></label>
        </div>
      </div>
      <div class="col-lg-8 col-md-6 col-sm-12">
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box mb-2" v-model="department.name" name="name" :rules="validateName"/>
          <ErrorMessage name="name" class="text-danger" />
          <label for="">Tên đơn vị <span class="text-danger">*</span></label>
        </div>
      </div>
    </div>
    <hr>
    <div class="row mb-3">
      <div class="card box">
        <div class="card-body">
          <UseDropZone @change-image="changeImage($event)" :avatarUrl="avatarUrl" />
        </div>
      </div>
    </div>

    <div class="row d-flex">
      <div class="col-12 text-right">
        <BaseButton class="btn-primary" :btnType="'submit'" id="btnSubmit" :name="'Lưu'" :textSize="'text-small'" />
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, reactive } from "vue";
import { useRoute } from 'vue-router';
import { Form, Field, ErrorMessage } from "vee-validate";

import TitleHeader from "~~/components/common/TitleHeader.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import UseDropZone from "~~/components/common/UseDropZone.vue";

import DepartmentService from "~~/services/model/department.service";

export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage, UseDropZone },
  setup() {
    const route = useRoute();
    const departmentId = ref(route.params.id);
    const avatar = ref(null);
    const avatarUrl = ref("");
    const isChangedAvatar = ref(false);
    const { $showToast } = useNuxtApp();

    const department = reactive({
      code: "",
      name: ""
    });
    const header = useHeader();
    function validateName(value) {
      if (!value)
        return "Trường này là bắt buộc";
      
      if (value.trim().length < 3)
        return "Trường này phải có hơn 3 ký tự";

      return true;
    }

    // TODO: Call api to get a department have id
    const getDepartmentById = () => {
      if (departmentId.value) {
        DepartmentService.getById(departmentId.value).then((response) => {
          let responseData = response.data;
          if (responseData) {
            department.code = responseData.code;
            department.name = responseData.name;
            avatarUrl.value = responseData.avatarUrl;
          }
        }).catch((error) => {
          console.log('error: ' + error);
        });
      }
    }

    // TODO: check department exist by code
    function checkDepartmentExistByCode() {
      if (department.code && department.code.length > 3) {
        DepartmentService.checkExistByCode(department.code).then(response => {
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
        }).catch((error) => {
          console.log("CHECK DEPARTMENT ERROR: ", error);
        })
      }
    }

    // call api save
    function onSubmit() {
      let data = {
        id: departmentId.value,
        code: department.code,
        name: department.name,
        avatarUrl: isChangedAvatar.value ? "" : avatarUrl.value,
      };
      if (avatar.value)
        data['avatar'] = avatar.value;
      
      const headers = { 
        'Authorization': header.value, 
        "Content-Type": "multipart/form-data" 
      };
      DepartmentService.saveOrUpdate(data, headers).then(response => {
        let responseData = response.data;
        if (responseData) {
          $showToast("Lưu thông tin đơn vị thành viên thành công!", "success", 2000);
          navigateTo("/common/department");
        }
      }).catch(error => {
        $showToast("Lưu thông tin đơn vị thành viên không thành công!", "error", 3000);
        console.log('error: ', error);
      });
    }

    const changeImage = (imageNew) => {
      console.log('============> Change avatar image')
      avatar.value = imageNew;
      isChangedAvatar.value = true;
    };

    return {
      avatar,
      avatarUrl,
      department,
      departmentId,

      getDepartmentById,
      onSubmit,
      validateName,
      changeImage,
      checkDepartmentExistByCode
    };
  },
  mounted() {
    this.getDepartmentById();
  }
};
</script>
<style lang="scss"></style>
