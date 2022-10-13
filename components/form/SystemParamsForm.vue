<template>
  <Form @submit="onSubmit()">
    <div class="row mb-3">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box" v-model="systemParam.paramName" name="paramName" :rules="validateRequired" :disabled="systemParamId" />
          <div class="mt-1 p-1">
            <ErrorMessage name="paramName" class="text-danger" />
          </div>
          <label for="">Tên tham số <span class="text-danger">*</span></label>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="form-floating mb-3">
          <Field type="text" class="form-control box" v-model="systemParam.paramValue" name="paramValue" :rules="validateRequired" 
          />
          <div class="mt-1 p-1">
            <ErrorMessage name="paramValue" class="text-danger" />
          </div>
          <label for="">Giá trị tham số <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="form-floating mb-3">
          <Field as="select" name="type" v-model="systemParam.type" class="form-select" required="required"
            :rules="validateSelect" :disabled="systemParamId">
              <option v-for="(systemType, index) in systemParamTypes" :key="index" :value="systemType.value">
                  {{ systemType.name }}
              </option>
              <ErrorMessage name="type" class="text-danger" />
          </Field>
          <label>Chọn kiểu giá trị <span class="text-danger">*</span></label>
        </div>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="form-floating mb-3">
          <Field as="textarea" name="description" v-model="systemParam.description" class="form-control box auto-scroll-y" id="floatingTextarea2" style="min-height: 100px" />
          <label for="">Mô tả</label>
        </div>
      </div>
    </div>
    <div class="row d-flex">
      <div class="col-12 text-right">
        <BaseButton class="btn-primary" :btnType="'submit'" :name="'Save'" :textSize="'text-small'" />
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, reactive } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";

import TitleHeader from "~~/components/common/TitleHeader.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import { systemParamTypes } from "~~/constants/enum";
import { validateRequired, validateSelect } from "~~/services/common.js";

import SystemParamService from "~~/services/model/systemParam.service";

export default {
  components: { TitleHeader, BaseButton, Form, Field, ErrorMessage },
  props: ["id", "systemParam"],
  setup(props) {
    const systemParamId = ref(null);
    const systemParam = reactive({
      paramName: "",
      paramValue: "",
      description: "",
      type: ""
    });
    const { $showToast } = useNuxtApp();

    function setSystemParam() {
      let systemParamExisted = props.systemParam;
      if (systemParamExisted) {
        systemParamId.value = props.id;
        systemParam.paramName = systemParamExisted.paramName;
        systemParam.paramValue = systemParamExisted.paramValue;
        systemParam.description = systemParamExisted.description;
        systemParam.type = systemParamExisted.type;
      }
    }

    watch(props, () => {
      setSystemParam();
    });

    // call api save
    function onSubmit() {
      let data = {
        id: systemParamId.value,
        paramName: systemParam.paramName,
        paramValue: systemParam.paramValue,
        description: systemParam.description,
        type: systemParam.type
      };
      // TODO: validate param type
      let isOK = checkParamType();
      if (isOK)
        SystemParamService.saveOrUpdate(data).then((response) => {
            let responseData = response.data;
            if (responseData) {
              $showToast("Lưu thông tin tham số hệ thống thành công", "success", 3000);
              navigateTo("/system/systemParams");
            }
          })
          .catch((error) => {
            $showToast("Lưu thông tin tham số hệ thống không thành công", "error", 2000);
            console.log("error: ", error);
          });
    }

    function checkParamType() {
      if (systemParam.type) {
        if (systemParam.type === "integer") {
          let message = "";
          if (isNaN(systemParam.paramValue)) {
            message = `Tham số ${systemParam.paramName} phải là kiểu số`;
            $showToast(message, "warning", 3000);
            return false;
          } else {
            if (systemParam.paramValue < 0) {
              message = `Tham số ${systemParam.paramName} phải là kiểu số lớn hơn 0`;
              $showToast(message, "warning", 3000);
              return false;
            }
            return true;
          }
        }
        return true;
      }
    }

    return {
      systemParamTypes: systemParamTypes,
      systemParam,
      systemParamId,
      onSubmit,
      validateRequired,
      validateSelect
    };
  }
};
</script>
<style lang="scss"></style>
