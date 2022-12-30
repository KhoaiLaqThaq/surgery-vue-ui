<template>
  <nav class="side-nav pt-2">
    <NuxtLink to="/" class="router-link-active router-link-exact-active d-flex intro-x">
      <img src="~/assets/images/logo/logomavin.png" alt="" class="logo-img logo-mavin" />
    </NuxtLink>
    <div class="side-nav__devider my-6 me-3"></div>
    <ul>
      <li v-for="(item, index) in items" :key="index" :class="item.to ? '':'nav-item has-submenu'">
          <template v-if="item.to">
              <nuxt-link  class="side-menu" :to="item.to" :title="item.title" @click="toggleSidebar()">
                  <div class="side-menu__icon" v-if="item.iconData">
                    <font-awesome-icon :icon="item.iconData" />
                  </div>
                  <span class="side-menu__title ps-1">{{ item.label }}</span>
              </nuxt-link>
          </template>
          <template v-else>
              <div class="nav-link side-menu" :title="item.title" @click="toggleSidebar(item.id)">
                  <div class="side-menu__icon" v-if="item.iconData">
                    <font-awesome-icon :icon="item.iconData" />
                  </div>
                  <span class="side-menu__title ps-1">{{ item.label }}</span>
              </div>
              <ul class="submenu collapse" :id="item.id">
                <li v-for="(subItem, index) in item.children" :key="index">
                  <nuxt-link class="side-menu" :to="subItem.to" :title="subItem.title">
                    <div class="side-menu__icon" v-if="subItem.iconData">
                      <font-awesome-icon :icon="subItem.iconData" />
                    </div>
                    <span class="side-menu__title ps-1">{{ subItem.label }}</span>
                  </nuxt-link>
                </li>
              </ul>
          </template>
      </li>

      <li class="mt-5"></li>
      <li class="logo-sidebar__bottom"></li>
    </ul>
  </nav>
</template>
<script>
import { ref } from "vue";

import {ROLES} from '~~/constants/roles.js';

export default {
  data() {
    const sidebarItems = [
      {
        to: "/",
        title: "Trang chủ",
        label: "Trang chủ",
        iconData: "fa-solid fa-house"
      },
      {
        to: null,
        title: "Quản lý hệ thống",
        label: "Quản lý hệ thống",
        id: "submenu1",
        iconData: "fa-solid fa-network-wired",
        acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MNG_SYSTEM],
        children: [
          {
            to: "/system/user",
            title: "Quản lý người dùng",
            label: "Người dùng",
            acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER_VIEW],
            iconData: "fa-solid fa-user",
          },
          {
            to: "/system/systemParams",
            title: "Quản lý tham số hệ thống",
            label: "Tham số hệ thống",
            acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_SYS_PARAM_VIEW],
            iconData: "fa-solid fa-gamepad",
          }
        ]
      },
      {
        to: null,
        title: "Quản lý chung",
        label: "Quản lý chung",
        id: "submenu2",
        iconData: "fa-solid fa-globe",
        acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MNG_COMMON],
        children: [
          {
            to: "/common/material",
            title: "Quản lý vật tư",
            label: "Quản lý vật tư",
            acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MATERIAL_VIEW],
            iconData: "fa-solid fa-grip-vertical"
          },
          {
            to: "/common/materialType",
            title: "Quản lý loại vật tư",
            label: "Loại vật tư",
            acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MATERIAL_TYPE_VIEW],
            iconData: "fa-solid fa-table",
          },
          {
            to: "/common/materialBatch",
            title: "Quản lý lô vật tư",
            label: "Lô vật tư",
            acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MATERIAL_BATCH_VIEW],
            iconData: "fa-solid fa-truck-fast",
          }
        ]
      },
      {
        to: "/patient",
        title: "Quản lý bệnh nhân",
        label: "Quản lý bệnh nhân",
        acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_PATIENT_VIEW],
        iconData: "fa-solid fa-user-injured",
      },
      {
          to: "/session",
          title: "Quản lý phiên khám",
          label: "Quản lý phiên khám",
          acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_SESSION_VIEW],
          iconData: "fa-solid fa-address-book",
      },
    ]

    return {
      items: sidebarItems
    }
  },
  setup() {
    const submenu = ref("");

    function onLoadRouteActive() {
      let routeActive = document.getElementsByClassName('router-link-exact-active');
      if (routeActive && routeActive.length > 0) {
        let size = routeActive.length;
        let routeCurrent = routeActive[size - 1];
        let submenuCurrent = routeCurrent.closest('ul');
        if (submenuCurrent) {
          submenu.value = submenuCurrent.id;
          submenuCurrent.classList.add('show')
        }
      }
    }

    function toggleSidebar(submenuId) {
      if (submenuId) {
        let submenuSelector = document.getElementById(submenuId);
        if (submenu.value === submenuId)
          submenuSelector.classList.toggle('show');
        else {
          if (submenu.value) {
            document.getElementById(submenu.value).classList.toggle('show');
          }
          submenuSelector.classList.toggle('show');
          submenu.value = submenuId;
        }
      } else {
        if (submenu.value) {
          document.getElementById(submenu.value).classList.toggle('show');
          submenu.value = ""
        }
      }
    }
    
    return {
      toggleSidebar,
      onLoadRouteActive
    };
  },
  mounted() {
    this.onLoadRouteActive();
  }
};
</script>
