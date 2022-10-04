<template>
  <Form @submit="onSubmit()">
    <div class="tabs-container">
      <ul>
        <li class="tabs__item selected">Thông tin người dùng</li>
        <li class="tabs__item" @click="navigateToAuthority()" v-if="useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN, ROLES.ROLE_USER_SET_AUTHORITY])">Phân quyền</li>
      </ul>
      <div class="tabs__content">
        <div class="card radius-unset mb-0 box">
          <div class="card-body">
            <div class="row mt-3 pb-0">
              <div class="col-12">
                <div class="row gx-2">
                  <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control box" required="required" autocomplete="false" v-model="user.firstName"/>
                    <label for="">Họ</label>
                  </div>
                  <div class="form-floating mb-3 col-6">
                    <input type="text" class="form-control box" required="required" autocomplete="false" v-model="user.lastName" />
                    <label for="">Tên</label>
                  </div>
                  <div class="form-floating mb-3 col-6">
                    <Field type="text" class="form-control box mb-1" required="required" autocomplete="false" v-model="user.username" name="username" :rules="validateName" :disabled="userId"/>
                    <div class="mt-1 p-1"><strong><ErrorMessage name="username" class="text-danger" /></strong></div>
                    <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                    <span class="float-check" @click="!userId && checkExistByUsername()">Kiểm tra</span>
                    <strong id="usernameMessage"></strong>
                  </div>
                  <div class="form-floating mb-3 col-6">
                    <Field type="email" class="form-control box mb-1" required="required" autocomplete="false" v-model="user.email" name="email" :rules="validateEmail"/>
                    <div class="mt-1 p-1"><strong><ErrorMessage name="email" class="text-danger" /></strong></div>
                    <label for="">Email <span class="text-danger">*</span></label>
                    <span class="float-check" @click="checkExistByEmail()">Kiểm tra</span>
                    <strong id="emailMessage"></strong>
                  </div>
                  <div class="col-6" v-if="showStatus">
                    <label for="">Kích hoạt tài khoản</label>
                    <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input cursor-pointer" v-model="user.accountEnabled" role="switch"/>
                    </div>
                  </div>
                </div>

                <div class="row mb-0">
                  <div class="col-12 mb-2" v-if="!groupName">
                    <strong class="text-danger"><span class="text-warning">* </span>Phân quyền tài khoản để kích hoạt sử dụng tài khoản trong hệ thống</strong>
                  </div>
                  <div class="col-12">
                    <div class="mb-2">
                      <span class="text-warning">* </span><span class="float-check-suggest">Kiểm tra</span> <b class="text-warning">Hỗ trợ người tạo kiểm tra thông tin người dùng đã tồn tại hay chưa.</b>
                    </div>
                    <strong class="text-warning">* Địa chỉ mail người tạo cần đảm bảo chính xác tiện cho hệ thống tự động gửi mật khẩu tài khoản đến hòm thư.</strong>
                    <p class="text-small text-secondary mb-0">(Chưa phát triển trong giai đoạn POC)</p>
                  </div>
                </div>

                <hr>
                <div class="row pb-0">
                  <div class="col-12 text-right">
                    <BaseButton class="btn-primary ms-auto" :btnType="'submit'" :name="'Lưu'" :textSize="'text-small'" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
// components
import { Form, Field, ErrorMessage } from "vee-validate";
import BaseSelect from "~~/components/common/BaseSelect.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import MultiCheckboxVue from "~~/components/common/MultiCheckbox.vue";
import BaseButton from "~~/components/common/BaseButton.vue";
import {ROLES} from "~~/constants/roles.js";
import { useCurrentsRole } from '~~/services/common.js'
import UserService from "~~/services/model/user.service";
import UserDepartService from "~~/services/model/userDepart.service";

export default {
  components: {
    TitleHeader,
    FloatSelect,
    BaseSelect,
    MultiCheckboxVue,
    Form,
    Field,
    ErrorMessage,
    BaseButton
  },
  setup() {
    const route = useRoute();
    const userId = ref(route.params && route.params.id);
    const userDepartmentId = ref("");
    const departmentId = ref("");
    const k6kGroupId = ref("");
    const groupName = ref("");

    const header = useHeader();
    const currentRole = useCurrentRole();
    const { $showToast } = useNuxtApp();
    const showStatus = ref(false);
    const titleForm = ref(userId.value ? "Giao diện chỉnh sửa người dùng":"Giao diện thêm mới người dùng");
    const user = reactive({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      accountEnabled: false
    });
    let headers = {
      'Authorization': header.value,
      'Content-Type': 'application/json'
    };

    const resetUseruserMessage = () => {
      let usernameMessage = document.getElementById("usernameMessage");
      if (usernameMessage && usernameMessage.textContent && usernameMessage.textContent.length > 0) {
        document.getElementById("usernameMessage").innerHTML = "";
      }
    }

    const resetEmailMessage = () => {
      let emailMessage = document.getElementById("emailMessage");
        if (emailMessage && emailMessage.textContent && emailMessage.textContent.length > 0) {
          document.getElementById("emailMessage").innerHTML = "";
        }
    }

    function validateName(value) {
      // if the field is empty
      if (!value) {
        resetUseruserMessage();
        return "Trường này là bắt buộc!";
      }
      // if the field is not a valid email
      if (value.length < 3){
        resetUseruserMessage();
        return "Trường này phải có hơn 3 ký tự!";
      }
      const regex = /[^a-z\d$&+,:;=?@#|'<>.-^*()%!]/gi;
      if (regex.test(value)) {
        resetUseruserMessage();
        return 'Tên đăng nhập không được chứa ký tự có dấu và khoảng trắng!';
      }
      // All is good
      return true;
    }

    function validateEmail(value) {
      // if the field is empty
      if (!value) {
        resetEmailMessage();
        return 'Trường này là bắt buộc!';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        resetEmailMessage();
        return 'Email không hợp lệ!';
      }
      // All is good
      return true;
    }

    function onLoadUserK6K() {
      if (userId.value) {
        // axios.get(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/user/${userId.value}`, { headers})
        UserService.getById(userId.value)
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            setUser(responseData);
            onLoadUserDepartment(responseData.id);
          } else onLoadUserError("Tải thông tin người dùng không thành công -1.");
        })
        .catch((error) => {
          onLoadUserError("Tải thông tin người dùng không thành công -1");
          console.log("LOAD USER ERROR: ", error);
        });
      }
    }

    function onLoadUserDepartment(k6kUserId) {
      if (k6kUserId) {
        // axios.get(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/userDepartment/${k6kUserId}`, { headers})
        UserDepartService.getById(k6kUserId)
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            userDepartmentId.value = responseData.id
            departmentId.value = responseData.departmentId;
            k6kGroupId.value = responseData.k6kGroupId;
            groupName.value = responseData.groupName;
            showStatus.value = responseData.groupName ? true : false;
          }
        })
        .catch((error) => {
          onLoadUserError("Tải thông tin người dùng không thành công -2");
        })
      }
    }

    function onSubmit() {
      console.log("Form Submmitted");
      let userData = {
        id: userId.value,
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accountEnabled: user.accountEnabled,
        groupName: groupName.value
      };
      // axios.post(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/user`, userData, {headers})
      UserService.saveOrUpdate(userData)
      .then((response) => {
        let responseData = response.data;
        if (responseData) {
          // save user-department
          saveUserDepartment(responseData);
        }
      })
      .catch((error) => {
        $showToast("Lưu người dùng thất bại -1", "error", 2000);
        console.log("SAVE USER ERROR -1: ", error);
      });
    }

    function saveUserDepartment(responseUserDepartment) {
      if (responseUserDepartment) {
        let newsDepartmentData = {
          id: userDepartmentId.value,
          username: responseUserDepartment.username,
          email: responseUserDepartment.email,
          firstName: responseUserDepartment.firstName,
          lastName: responseUserDepartment.lastName,
          enabled: user.accountEnabled,
          k6kUserId: userId.value ? userId.value : responseUserDepartment.id,
          k6kGroupId: k6kGroupId.value,
          groupName: groupName.value,
          departmentId: departmentId.value
        };
        // axios.post(`${CONFIG.BASE_URL}/${CONFIG.NEWS_GATEWAY}/api/userDepartment`, newsDepartmentData, { headers})
        UserDepartService.saveOrUpdate(newsDepartmentData)
        .then((response) => {
          let responseData = response.data;
          if (responseData) {
            $showToast("Lưu người dùng thành công", "success", 2000);
            if (!responseData.groupName) {
              $showToast("Mật khẩu mặc định là: 1234567a@", "warning", 5000);
              navigateTo("/system/user/form/" + responseUserDepartment.id);
            } else {
              // location.reload();
            }
          }
        })
        .catch((error) => {
          $showToast("Lưu người dùng thất bại -2", "error", 2000);
          console.log("SAVE USER ERROR -2: ", error);
        })
      }
    }

    function setUser(newUser) {
      if (newUser) {
        user.username = newUser.username;
        user.password = newUser.password;
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.email = newUser.email;
        user.accountEnabled = newUser.accountEnabled;
      }
    }

    function onLoadUserError(message) {
      $showToast(message, "warning", 3000);
      navigateTo("/system/user");
    }

    function navigateToAuthority() {
      if (!userId.value){
        $showToast("Yêu cầu tạo người dùng trước", "warning", 3000);
      } else
        navigateTo("/system/user/form/authority/" + userId.value);
    }

    // TODO: check user ton tai hay chua field username
    function checkExistByUsername() {
      const regex = /[^a-z\d$&+,:;=?@#|'<>.-^*()%!]/gi;
      if (!regex.test(user.username)) {
        if (user.username.length >= 3) {
          // axios.get(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/user/checkExistByUsername/${user.username}`, { headers })
          UserService.checkExistUser(user.username)
          .then(response => {
            let isExist = response.data;
            let usernameMessageSelector = document.getElementById("usernameMessage");
            if (isExist) {
              usernameMessageSelector.innerText = "Tên người dùng đã tồn tại!";
              usernameMessageSelector.classList.add("text-danger");
              usernameMessageSelector.classList.remove("text-success");
            } else {
              usernameMessageSelector.innerText = "Tên người dùng phù hợp!";
              usernameMessageSelector.classList.add("text-success");
              usernameMessageSelector.classList.remove("text-danger");
            }
          })
          .catch(error => {
            $showToast("Kiểm tra tên đăng nhập của người dùng tồn tại thất bại", "error", 3000);
            console.log("CHECK USER EXIST ERROR: ", error);
          })
        }
      }
    }


    // TODO: check user ton tai hay chua field email
    function checkExistByEmail() {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (regex.test(user.email)) {
        // axios.get(`${CONFIG.BASE_URL}/${CONFIG.USER_GATEWAY}/api/user/checkExistByEmail/${user.email}`, { headers })
        UserService.checkEmail(user.email)
        .then(response => {
          let isExist = response.data;
          let usernameMessageSelector = document.getElementById("emailMessage");
          if (isExist) {
            usernameMessageSelector.innerText = "Địa chỉ mail người dùng đã tồn tại!";
            usernameMessageSelector.classList.add("text-danger");
            usernameMessageSelector.classList.remove("text-success");
          } else {
            usernameMessageSelector.innerText = "Địa chỉ mail người dùng phù hợp!";
            usernameMessageSelector.classList.add("text-success");
            usernameMessageSelector.classList.remove("text-danger");
          }
        })
        .catch(error => {
          $showToast("Kiểm tra địa chỉ mail của người dùng tồn tại thất bại", "error", 3000);
          console.log("CHECK USER EXIST ERROR: ", error);
        })
      }
    }

    return {
      userId,
      titleForm,
      ROLES,
      currentRole,
      user,
      showStatus,
      groupName,

      // function
      onSubmit,
      useCurrentsRole,
      navigateToAuthority,
      onLoadUserK6K,
      checkExistByEmail,
      checkExistByUsername,
      validateName,
      validateEmail
    };
  },
  created() {
    this.onLoadUserK6K();
  }
};
</script>
<style lang="scss"></style>
