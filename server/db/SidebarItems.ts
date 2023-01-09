import { ROLES } from "~~/constants/roles";
export const sidebarItems = {
    items: [
        {
          to: "/",
          title: "label.sidebar.home",
          // title: "Trang chủ",
          label: "label.sidebar.home",
          iconData: "fa-solid fa-house"
        },
        {
          to: null,
          title: "label.sidebar.system",
          label: "label.sidebar.system",
          id: "submenu1",
          iconData: "fa-solid fa-network-wired",
          acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MNG_SYSTEM],
          children: [
            {
              to: "/system/user",
              title: "label.sidebar.user",
              label: "label.sidebar.user",
              acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_USER_VIEW],
              iconData: "fa-solid fa-user",
            },
            {
              to: "/system/systemParams",
              title: "label.sidebar.systemParams",
              label: "label.sidebar.systemParams",
              acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_SYS_PARAM_VIEW],
              iconData: "fa-solid fa-gamepad",
            }
          ]
        },
        {
          to: null,
          title: "label.sidebar.common",
          label: "label.sidebar.common",
          id: "submenu2",
          iconData: "fa-solid fa-globe",
          acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MNG_COMMON],
          children: [
            {
              to: "/common/material",
              title: "label.sidebar.material",
              label: "label.sidebar.material",
              acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MATERIAL_VIEW],
              iconData: "fa-solid fa-grip-vertical"
            },
            {
              to: "/common/materialType",
              title: "label.sidebar.materialType",
              label: "label.sidebar.materialType",
              acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MATERIAL_TYPE_VIEW],
              iconData: "fa-solid fa-table",
            },
            {
              to: "/common/materialBatch",
              title: "label.sidebar.materialBatch",
              label: "label.sidebar.materialBatch",
              acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_MATERIAL_BATCH_VIEW],
              iconData: "fa-solid fa-truck-fast",
            }
          ]
        },
        {
          to: "/patient",
          title: "label.sidebar.patient",
          label: "label.sidebar.patient",
          acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_PATIENT_VIEW],
          iconData: "fa-solid fa-user-injured",
        },
        {
            to: "/session",
            title: "label.sidebar.session",
            label: "label.sidebar.session",
            acceptRole: [ROLES.ROLE_ADMIN, ROLES.ROLE_SESSION_VIEW],
            iconData: "fa-solid fa-address-book",
        },
    ]
};
