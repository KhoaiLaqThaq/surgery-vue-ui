<template>
  <div class="row justify-content-center mt-5" id="authLayout">
    <div class="col-sm-8 col-md-4 col-lg-4 col-xl-3 mt-5">
      <div class="card box">
        <div class="card-body p-4">
          <div class="text-center m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="text-center">
                <span class="logo-lg">
                  <img src="~/assets/images/logo-mavin2.jpeg" alt="" height="200" />
                </span>
              </nuxt-link>
            </div>
          </div>

          <form @submit.prevent="login()">
            <!-- email -->
            <div class="form-floating mb-3">
              <input class="form-control" type="text" id="emailaddress" v-model="currentUser.username" />
              <label for="emailaddress">Nhập tên đăng nhập <span class="text-danger">*</span></label>
            </div>
            <!-- /email -->
            <!-- password -->
            <div class="form-floating mb-3">
              <input type="password" id="password" class="form-control" v-model="currentUser.password" />
              <label for="password">Mật khẩu <span class="text-danger">*</span></label>
            </div>
            <!-- /password -->

            <div class="form-group">
              <strong><span class="text-danger">{{errorMessage}}</span></strong>
            </div>
            <hr />
            <div class="form-group mb-0 text-center">
              <button class="btn btn-login btn-block" id="btnSubmit" type="submit">
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->

      <!-- end row -->
    </div>
    <!-- end col -->
  </div>
</template>
<script>
import { ref, reactive } from 'vue';
import AuthService from "~~/services/model/auth.service";

import VueJwtDecode from 'vue-jwt-decode';
import { HttpStatus } from '~~/constants/http-status';

export default {
  setup() {
    const currentUser = reactive({
      username: '',
      password: ''
    });
    const errorMessage = ref('');
    // state global
    const token = useToken();
    const header = useHeader();
    const currentRole = useCurrentRole();
    const currUser = useCurrentUser();
    const { $showToast } = useNuxtApp();

    function login(e) {
      console.log("====>Entering login");
      if (currentUser.username != "" && currentUser.password != "") {
        localStorage.clear();
        let data = {
          username: currentUser.username,
          password: currentUser.password
        };

        AuthService.login(data)
          .then((response) => {
            let responseData = response.data;
            console.log('response:', response);
            if (responseData){
              console.log('response status:', response.status);
              if( response.status == HttpStatus.OK) {
                saveInforLogin(responseData);
                $showToast("Đăng nhập thành công!", "success", 2000);
              } else if (response.status == HttpStatus.BAD_CREDENTIALS) {
                errorMessage.value = "Xác thực không thành công!";
                $showToast("Đăng nhập không thành công!", "error", 2000);
              } else {
                errorMessage.value = "Ops! Lỗi không xác định.";
              }
            }
          }).catch(error => {
            errorMessage.value = "Vui lòng kiểm tra lại thông tin tài khoản!";
            console.log("LOGIN ERROR: " + error);
          });

      }
    }

    function saveInforLogin(responseData) {
      let accessToken = responseData?.jwt;
      let decode = VueJwtDecode.decode(responseData?.jwt);
      console.log("Decode: ", decode);
      if (decode) {
        let roles = responseData?.roles;
        let expiresIn = decode.exp - decode.iat;

        // set global state
        token.value = accessToken;
        header.value = `Bearer ${accessToken}`;
        currentRole.value = roles;
        currUser.value = responseData?.username;
        // set localStorage
        localStorage.setItem("roles", roles);
        localStorage.setItem("token", accessToken);
        localStorage.setItem("exp", expiresIn);
        localStorage.setItem("time", new Date().getTime());
      }
    }

    return {
      currentUser,
      errorMessage,

      login,
    };
  },
  mounted() {
    this.tokenState = "";
  },
};
</script>
