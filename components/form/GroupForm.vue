<template>
  <form @submit.prevent="onSubmit()" enctype="multipart/form-data">
    <div class="d-flex">
      <TitleHeader :title="titleForm" />
      <BaseButton
        class="btn-primary ms-auto"
        :btnType="'submit'"
        :name="'Lưu'"
        :textSize="'text-small'"
      />
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <div class="form-floating mb-3 col-6">
          <Field
            type="text"
            class="form-control box"
            name="name"
            v-model="group.name"
            :rules="validateName"
          />
          <div class="mt-1 p-1">
            <ErrorMessage name="name" class="text-danger" />
          </div>
          <label for=""
            >Tên nhóm quyền <span class="text-danger">*</span></label
          >
        </div>

        <label for="">Phân quyền <span class="text-danger">*</span></label>
        <div class="form-floating mb-3 row">
          <!-- <MultiCheckboxVue v-model:value="priority" :options="options" /> -->
          <DualListBox 
            class="m-auto" 
            :source="source" 
            :destination="destination" 
            label="description"
            v-on:onChangeList="onChangeList" />
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
// components
import BaseButton from "~~/components/common/BaseButton.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import UseDropZone from "~~/components/common/UseDropZone.vue";
import DualListBox from "~~/components/DualListBox.vue";

import axios from "axios";
import CONFIG from "~~/config";

import GroupService from "~~/services/model/group.service";

export default {
  components: {
    TitleHeader,
    BaseButton,
    UseDropZone,
    DualListBox,
    Form, 
    Field, 
    ErrorMessage,
  },
  props: ["user"],
  data() {
    return {
      titleForm: "Giao diện thêm mới nhóm quyền",
    };
  },
  methods: {
    onChangeList: function ({ source, destination }) {
      this.source = source;
      this.destination = destination;
    },
  },
  setup() {
    const route = useRoute();
    const priority = ref([]);
    const header = useHeader();
    const group = reactive({
      name: "",
    });
    const groupId = ref(route.params.id);
     //source and destination of roles dual-listbox
    const source = ref([]);
    const destination = ref([]);
    const {$showToast} = useNuxtApp();
    // TODO: Call api to get a group have id
    const getGroupById = () => {
      if (groupId.value) {
        GroupService.getById(groupId.value).then((response) => {
            let responseData = response.data;
            if (responseData) {
              group.name = responseData.name;
              if (responseData.roles?.length > 0) {
                destination.value = responseData.roles;
                resetRoleSource();
              }
            }
          })
          .catch((error) => {
            $showToast("ERROR: Tải dữ liệu nhóm quyền không thành công", "error", 2000);
            console.log("error: " + error);
          });
      }
    };

    function onSubmit() {
      console.log("Form Submmitted");
      let roles = ref([]);
      destination.value.forEach((item) => {
        roles.value.push({id: item.id, name: item.name, description: item.description})
      });
      let groupData = {
        id: groupId.value ? groupId.value : null,
        name: group.name,
        enabled: true,
        roles: roles.value,
      };
      GroupService.saveOrUpdate(groupData).then((response) => {
          let responseData = response.data;
          if (responseData) {
            $showToast("Lưu nhóm quyền thành công", "success", 2000);
            navigateTo("/system/group");
          }
        })
        .catch((error) => {
          $showToast("ERROR: Lưu nhóm quyền không thành công", "error", 2000);
          console.log("error: ", error);
        });
    }

    function validateName(value) {
      if (!value)
        return "Trường này là bắt buộc";
      
      if (value.trim().length < 3)
        return "Trường này phải có hơn 3 ký tự";

      return true;
    }

    function getListRoles() {
      GroupService.getAllRoles().then((response) => {
        const data = response.data;
        if (data) {
          source.value = data;
          resetRoleSource();
        }
      })
      .catch((e) => {
        console.log(e.toString());
      });
    }

    function resetRoleSource() {
      if (source.value.length > 0) {
        source.value.forEach((s, index) => {
          let check = destination.value.find((d) => d.id === s.id);
          if (check != undefined) {
              source.value.splice(index, 1);
              resetRoleSource();
          }
        });
      }
    }
    return {
      priority,
      group,
      groupId,
      source,
      destination,
      // function
      onSubmit,
      getListRoles,
      getGroupById,
      validateName,
    };
  },
  created(){
    this.getListRoles();
    this.getGroupById();
  }
};
</script>
<style lang="scss"></style>
