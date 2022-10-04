<template>
    <div class="table-container">
        <div class="tr">
            <div class="th" v-for="(item, index) in headers" :key="index">
                {{item.text}}
            </div>
            <div class="th pe-3" v-if="actionEdit || actionDelete">Hành động</div>
        </div>

        <div class="tr" v-for="(item, index) in items" :key="index">
            <div class="td text-center">{{ index + 1 + page*size }}</div>
            <div class="td">{{ item.code }}</div>
            <div class="td">{{ item.name }}</div>
            <div class="td">{{ displayLocalDate(item.dob) }}</div>
            <div class="td">{{ displayGender(item.gender) }}</div>
            <div class="td">{{ item.phone }}</div>
            <div class="td text-primary cursor-pointer">
                <NuxtLink :to="'/session/patient/' + item.id" target="_blank">
                    <PostIcon /> <span>Bệnh án</span>
                </NuxtLink>
            </div>

            <div class="td pe-3" v-if="actionEdit || actionDelete">
                <div class="action-group d-flex">
                    <nuxt-link :to="routerPush + item.id" v-if="actionEdit && useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN])">
                        <EditIcon /> <span class="ms-1">Sửa</span>
                    </nuxt-link>
                    <div v-if="actionDelete && useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN])" class="ms-3 cursor-pointer text-danger">
                        <delete-icon @click="deletePatient(item.id)" /> <span class="ms-1">Xóa</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
</template>
<script>
import { ref } from 'vue';
import { useCurrentsRole } from "~~/services/common.js";

import PostIcon from "~~/assets/images/icons/PostIcon.vue";
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import {ROLES} from "~~/constants/roles.js";
import { displayLocalDate } from "~~/constants/format-date.js";
import SessionService from "~~/services/model/session.service";

export default {
    components: {
        EditIcon,
        DeleteIcon,
        PostIcon
    },
    props: ["headers", "items", "actionEdit", "actionDelete", "page", "size", "routerPush"],
    setup(props, {emit}) {
        const currentRole = useCurrentRole();
        const { $showToast } = useNuxtApp();

        const displayGender = (gender) => gender == 0 ? "Nam" : "Nữ";

        function deletePatient(id) {

        }

        // TODO: Hiển thị phiên khám theo mã bệnh nhân
        function showSession(patientCode) {
            if (patientCode)
                SessionService.getAllByPatientCode(patientCode)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        
                    }
                }).catch((error) => {
                    console.log("Error: ", error);
                    $showToast("Lấy thông tin phiên khám của bệnh nhân không thành công!", "error", 3000);
                });
        }

        return {
            ROLES,
            currentRole,

            useCurrentsRole,
            deletePatient,
            displayGender,
            displayLocalDate,
        }
    }
}
</script>
<style lang="scss">
    
</style>