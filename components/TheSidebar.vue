<template>
  <nav class="side-nav pt-2">
    <NuxtLink to="/" class="router-link-active router-link-exact-active d-flex intro-x">
      <img src="~/assets/images/logo/logomavin.png" alt="" class="logo-img logo-mavin" />
    </NuxtLink>
    <div class="side-nav__devider my-6 me-3"></div>
    <ul>
      <li>
        <NuxtLink to="/" class="side-menu" title="Trang chủ">
          <div class="side-menu__icon"></div>
          <span class="side-menu__title pl-1"> Trang chủ</span>
        </NuxtLink>
      </li>
      <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a class="nav-link side-menu cursor-pointer" title="Quản lý chung" @click="toggleSubmenu('system')" id="system"
          ref="system" :v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_MNG_SYSTEM])">
          <div class="side-menu__icon">
            <IconTooling />
          </div>
          <span class="side-menu__title pl-1"> Quản lý hệ thống</span>
        </a>
        <ul class="submenu collapse">
          <!-- <li>
            <NuxtLink to="/system/group" class="side-menu" aria-label="group"
              :class="{ active: routeNameActive == 'group' }"
              v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_GROUP_USER_VIEW])">
              <div class="side-menu__icon">
                <IconGroup />
              </div>
              <span class="side-menu__title pl-1"> Nhóm người dùng</span>
            </NuxtLink>
          </li> -->
          <li>
            <NuxtLink to="/system/user" class="side-menu" aria-label="user"
              :class="{ active: routeNameActive == 'user' }" title="Quản lý người dùng"
              v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_USER_VIEW])">
              <div class="side-menu__icon">
                <UserIcon />
              </div>
              <span class="side-menu__title pl-1"> Người dùng</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/system/systemParams" class="side-menu" aria-label="systemParams"
              :class="{ active: routeNameActive == 'systemParams' }" title="Quản lý tham số hệ thống"
              v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_SYS_PARAM_VIEW])">
              <div class="side-menu__icon">
                <ComputerIcon />
              </div>
              <span class="side-menu__title pl-1"> Tham số hệ thống</span>
            </NuxtLink>
          </li>
        </ul>
      </li>
      <!-- submenu -->
      <li class="nav-item has-submenu" aria-label="has-submenu">
        <a class="nav-link side-menu cursor-pointer" title="Quản lý chung" @click="toggleSubmenu('common')" id="common"
          ref="common" v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_MNG_COMMON])">
          <div class="side-menu__icon">
            <IconCommunity />
          </div>
          <span class="side-menu__title pl-1"> Quản lý chung</span>
        </a>
        <ul class="submenu collapse">
          <!-- Vật tư -->
          <li>
            <NuxtLink to="/common/material" class="side-menu" aria-label="material"
              :class="{ active: routeNameActive == 'material' }" title="Quản lý vật tư"
              v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_TOPIC_VIEW])">
              <div class="side-menu__icon">
                <IconTopic />
              </div>
              <span class="side-menu__title pl-1"> Vật tư</span>
            </NuxtLink>
          </li>
          <!-- /Vật tư -->

          <!-- Loại vật tư -->
          <li>
            <NuxtLink to="/common/materialType" class="side-menu" aria-label="materialType"
              :class="{ active: routeNameActive == 'materialType' }" title="Quản lý loại vật tư"
              v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_TOPIC_VIEW])">
              <div class="side-menu__icon">
                <IconTopic />
              </div>
              <span class="side-menu__title pl-1"> Loại Vật tư</span>
            </NuxtLink>
          </li>
          <!-- /Loại vật tư -->

          <!-- Lô vật tư -->
          <li>
            <NuxtLink to="/common/materialBatch" class="side-menu" aria-label="materialBatch"
              :class="{ active: routeNameActive == 'materialBatch' }" title="Quản lý lô vật tư"
              v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_TOPIC_VIEW])">
              <div class="side-menu__icon">
                <IconTopic />
              </div>
              <span class="side-menu__title pl-1"> Lô Vật tư</span>
            </NuxtLink>
          </li>
          <!-- /Lô vật tư -->
        </ul>
      </li>
      <!-- Bệnh nhân -->
      <li>
        <NuxtLink to="/patient" class="side-menu" :class="{ active: routeNameActive == 'patient' }" title="Quản lý bệnh nhân"
          v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN])">
          <div class="side-menu__icon">
            <UserIcon />
          </div>
          <span class="side-menu__title pl-1"> Quản lý bệnh nhân</span>
        </NuxtLink>
      </li>
      <!-- /Bệnh nhân -->

      <!-- Phiên khám -->
      <li>
        <NuxtLink to="/session" class="side-menu" :class="{ active: routeNameActive == 'session' }" title="Quản lý phiên khám"
          v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN])">
          <div class="side-menu__icon">
            <PostIcon />
          </div>
          <span class="side-menu__title pl-1"> Quản lý phiên khám</span>
        </NuxtLink>
      </li>
      <!-- /Phiên khám -->

      <li class="nav-item has-submenu d-none" aria-label="has-submenu">
        <a class="nav-link side-menu cursor-pointer" title="Mavin Analytics" @click="toggleSubmenu('analytics')" id="analytics"
          ref="analytics" v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN, ROLES.ROLE_MNG_COMMON])">
          <div class="side-menu__icon"><BarChartIcon /></div>
          <span class="side-menu__title pl-1">Mavin Analytics</span>
        </a>
        <ul class="submenu collapse">
          <li>
            <NuxtLink to="/analytics/user" class="side-menu" aria-label="user"
              :class="{ active: routeNameActive == 'analytics' }" title="Mavin Analytics"
              v-if="checkSidebarAuthority([ROLES.ROLE_ADMIN])">
              <div class="side-menu__icon">
                <UserChartIcon />
              </div>
              <span class="side-menu__title pl-1"> User Analytics</span>
            </NuxtLink>
            <ul class="side-menu__sub-open"></ul>
          </li>
        </ul>
      </li>

      <li class="mt-5"></li>
      <li class="logo-sidebar__bottom"></li>
    </ul>
  </nav>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import UserIcon from "~~/assets/images/icons/UserIcon.vue";
import PostIcon from "~~/assets/images/icons/PostIcon.vue";
import ImgSidebar from "~~/assets/images/logo/ImgSidebar.vue";
import IconUnit from "~~/assets/images/icons/IconUnit.vue";
import IconTopic from "~~/assets/images/icons/IconTopic.vue";
import IconCommunity from "~~/assets/images/icons/IconCommunity.vue";
import IconGroup from "~~/assets/images/icons/IconGroup.vue";
import IconTooling from "~~/assets/images/icons/IconTooling.vue";
import IconComment from "~~/assets/images/icons/IconComment.vue";
import ComputerIcon from "~~/assets/images/icons/ComputerIcon.vue";
import IconDocumentation from "~~/assets/images/icons/IconDocumentation.vue";
import BarChartIcon from "~~/assets/images/icons/charts/BarChartIcon.vue";
import UserChartIcon from "~~/assets/images/icons/charts/UserChartIcon.vue";

import {ROLES} from '~~/constants/roles.js';

export default {
  components: {
    UserIcon,
    PostIcon,
    ImgSidebar,
    IconUnit,
    IconTopic,
    IconCommunity,
    IconGroup,
    IconTooling,
    IconComment,
    ComputerIcon,
    IconDocumentation,
    BarChartIcon,
    UserChartIcon
  },

  setup() {
    const routeNameActive = ref();
    const route = useRoute();
    const routeNameState = useRouteActive();
    const common = ref(null);
    const system = ref(null);
    const analytics = ref(null);
    // TODO: define submenu
    const routeSubMenu = ref("common, system, analytics"); // common, system

    // TODO: to call state global
    const token = useToken();
    const header = useHeader();
    const currentRole = useCurrentRole();
    const resetRouteNameState = () => routeNameState.value = null;
    const toggleSubmenu = (e) => document.getElementById(e).nextElementSibling.classList.toggle("show");
    
    const onLoadRouteNameCurrent = () => {
      setRouteNameActive(route.name);
      checkAuthentication();
    };

    function setRouteNameActive(to) {
      let pageGroup = to.split("-"); // ['common', 'department', ...]
      let toGroup = pageGroup[0]; // to show submenu
      routeNameActive.value = toGroup;
      routeNameState.value = toGroup;
      setLocalStorageRoute(toGroup);

      let rType = localStorage.getItem("rType");
      if (rType == null) {
        const submenu = document.getElementsByClassName("submenu");
        if (submenu) {
          for (let i = 0; i < submenu.length; i++) {
            const element = submenu[i];
            // to hide submenu
            element.classList.remove("show");
          }
        }
      } else {
        let toSubGroup = pageGroup[1];
        routeNameActive.value = toSubGroup;
        routeNameState.value = toSubGroup;
        // to show submenu
        document
          .getElementById(toGroup)
          .nextElementSibling.classList.add("show");
      }
    }

    function setLocalStorageRoute(pageGroup) {
      if (routeSubMenu.value.includes(pageGroup)) {
        localStorage.setItem("activeRname", pageGroup);
        localStorage.setItem("rType", "submenu");
      } else {
        localStorage.removeItem("activeRname");
        localStorage.removeItem("rType");
      }
    }

    // check token
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
          }
          // check header global state
          if (!header.value) header.value = `Bearer ${jwtTokenStorage}`;
          // set role current to check sidebar;
          if (!currentRole.value) currentRole.value = roles;
        }
      } else {
        console.log("----------reset state with logout");
        resetStateBeforeLogout();
      }
    }

    function resetStateBeforeLogout() {
      token.value = '';
      localStorage.clear();
      navigateTo("/");
    }

    // TODO: Kiem tra quyen chuc nang show/hide sidebar
    function checkSidebarAuthority(roleItems) {
      let roleCurrents = localStorage.getItem("roles");

      if (roleCurrents && roleItems) {
        for (let i = 0; i < roleItems.length; i++) {
          if (roleCurrents.includes(roleItems[i]))
            return true;
        }
        return false;
      }
    }

    const toggleSidebar = () => document.getElementById('sidebar').classList.remove('show-xs');

    return {
      routeNameActive,
      common, system, analytics,
      ROLES,

      toggleSubmenu,
      resetRouteNameState,
      setRouteNameActive,
      onLoadRouteNameCurrent,
      checkAuthentication,
      checkSidebarAuthority,
      toggleSidebar
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        this.resetRouteNameState();
        this.setRouteNameActive(to.name);
        this.checkAuthentication(to);
        this.toggleSidebar();
      },
    },
  },
  mounted() {
    this.resetRouteNameState();
    this.onLoadRouteNameCurrent();
  }
};
</script>
