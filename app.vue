<template>
  <div id="main" class="auto-scroll-y">
    <NuxtLayout :name="layout"></NuxtLayout>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import "bootstrap";
import '@vuepic/vue-datepicker/dist/main.css'

import TokenService from "~~/services/model/token.service";

export default {
  setup() {
    const layout = useLayoutActive();
    const token = useToken();
    const header = useHeader();
    const currentRole = useCurrentRole();
    const currentUser = useCurrentUser();

    const setLayoutDefault = () => {
      if (token.value) {
        layout.value = 'admin';
      } else {
        layout.value = 'auth';
      }
    }

    watch([token], () => {
      setLayoutDefault();
    });

    function resetStateBeforeLogout() {
      token.value = '';
      localStorage.clear();
      navigateTo("/");
    }

    function checkAuthentication() {
      let jwtTokenStorage = localStorage.getItem("token");
      let expired = localStorage.getItem("exp");
      let time = localStorage.getItem("time");
      let roles = localStorage.getItem("roles");

      // TODO: Tính toán thời gian request hết hạn chưa.
      if (time && expired) {
        let diffTime = Math.abs(new Date().getTime() - time);
        if (diffTime < (expired * 1000)) {
          if (jwtTokenStorage && !token.value) {
            token.value = jwtTokenStorage;
            // check header global state
            if (!header.value) header.value = `Bearer ${jwtTokenStorage}`;

            // set role current
            if (!currentRole.value) currentRole.value = roles;
          }
        }
      } else resetStateBeforeLogout();
    }

    return {
      layout,

      setLayoutDefault,
      checkAuthentication
    }
  },
  mounted() {
    this.setLayoutDefault();
    this.checkAuthentication();
  },
  unmounted() {
    TokenService.logout();
  }
}
</script>
