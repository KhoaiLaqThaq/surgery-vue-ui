<template>
  <nav class="side-nav pt-2">
    <NuxtLink to="/" class="router-link-active router-link-exact-active d-flex intro-x">
      <img src="~/assets/images/logo/logomavin.png" alt="" class="logo-img logo-mavin" />
    </NuxtLink>
    <div class="side-nav__devider my-6 me-3"></div>
    <ul>
      <li v-for="(item, index) in items" :key="index" :class="item.to ? '':'nav-item has-submenu'">
          <template v-if="item.to">
              <nuxt-link  class="side-menu" :to="item.to" :title="$t(item.title)" @click="toggleSidebar()">
                  <div class="side-menu__icon" v-if="item.iconData">
                    <font-awesome-icon :icon="item.iconData" />
                  </div>
                  <span class="side-menu__title ps-1">{{ $t(item.label) }}</span>
              </nuxt-link>
          </template>
          <template v-else>
              <div class="nav-link side-menu" :title="$t(item.title)" @click="toggleSidebar(item.id, false)">
                  <div class="side-menu__icon" v-if="item.iconData">
                    <font-awesome-icon :icon="item.iconData" />
                  </div>
                  <span class="side-menu__title ps-1">{{ $t(item.label) }}</span>
              </div>
              <ul class="submenu collapse" :id="item.id">
                <li v-for="(subItem, index) in item.children" :key="index">
                  <nuxt-link class="side-menu" :to="subItem.to" :title="$t(subItem.title)" @click="toggleSidebar(item.id, true)">
                    <div class="side-menu__icon" v-if="subItem.iconData">
                      <font-awesome-icon :icon="subItem.iconData" class="s14x14"/>
                    </div>
                    <span class="side-menu__title ps-1">{{ $t(subItem.label) }}</span>
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

import SidebarService from "~~/services/model/sidebar.service";

export default {
  setup() {
    const submenu = ref("");
    const setSubmenu = (str) => submenu.value = str;

    const items = ref(null);

    async function initData() {
      await SidebarService.getInitData()
        .then(async res => {
          if (res.data) {
            items.value = res.data;
            await nextTick();
            onLoadRouteActive();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }


    function onLoadRouteActive() {
      let routeActive = document.getElementsByClassName('router-link-exact-active');
      if (routeActive && routeActive.length > 0) {
        let size = routeActive.length;
        let routeCurrent = routeActive[size - 1];
        let submenuCurrent = routeCurrent.closest('ul');
        if (submenuCurrent) {
          setSubmenu(submenuCurrent.id);
          submenuCurrent.classList.add('show')
        }
      }
    }

    function toggleSidebar(submenuId, choiceSubmenu) {
      if (submenuId) {
        let submenuSelector = document.getElementById(submenuId);
        if (!choiceSubmenu) {
          // Case: chọn Show|hide submenu
          submenuSelector.classList.toggle('show');
        } else {
          // Case: Chọn submenu
          if (submenu.value === submenuId) {
            // Case: Chon submenu cung level cung parent
            setSubmenu(submenuId);
          }
          else {
            // Case: Chon submenu cung level khac parent
            if (submenu.value) {
              document.getElementById(submenu.value).classList.toggle('show');
            }
            setSubmenu(submenuId);
          }
        }
      } else {
        if (submenu.value) {
          document.getElementById(submenu.value).classList.toggle('show');
          setSubmenu("");
        }
      }
    }
    
    return {
      items,

      toggleSidebar,
      onLoadRouteActive,
      initData
    };
  },
  // watch: {
  //   $route: {
  //     deep: true,
  //     handler(to, from) {
  //       this.toggleSidebar();
  //     }
  //   }
  // },
  beforeCreate() {
    this.initData();
  }
};
</script>
