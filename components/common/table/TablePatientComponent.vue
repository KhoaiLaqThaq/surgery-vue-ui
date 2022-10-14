<template>
    <div class="table-container">
        <div class="tr">
            <div class="th" v-for="(item, index) in headers" :key="index" :class="item.classCss">
                {{item.text}}
            </div>
            <div class="th pe-3" v-if="actionEdit || actionDelete">Hành động</div>
        </div>

        <div class="tr zoom-in-little" v-for="(item, index) in items" :key="index">
            <div class="td text-center hidden-xs">{{ index + 1 + page*size }}</div>
            <div class="td hidden-xs">{{ item.code }}</div>
            <div class="td">{{ item.name }}</div>
            <div class="td"><a :href="'tel:' + item.phone">{{ item.phone }}</a></div>
            <div class="td text-center text-primary cursor-pointer">
                <div class="box-container"
                    data-bs-toggle="modal" data-bs-target="#contactUs"
                    @click="setPatientActive(item.id)"
                >
                    <IconDocumentation /> <span class="hidden-xs">Chi tiết</span>
                </div>
            </div>
            <div class="td text-center text-primary cursor-pointer">
                <NuxtLink :to="'/session/patient/' + item.id" target="_blank">
                    <PostIcon /> <span class="hidden-xs">Bệnh án</span>
                </NuxtLink>
            </div>

            <div class="td pe-3" v-if="actionEdit || actionDelete">
                <div class="action-group d-flex">
                    <NuxtLink :to="routerPush + '/' + item.id" v-if="actionEdit && useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN])">
                        <EditIcon /> <span class="ms-1">Sửa</span>
                    </NuxtLink>
                    <div v-if="actionDelete && useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN])" class="ms-3 cursor-pointer text-danger">
                        <DeleteIcon @click="deletePatient(item.id)" /> <span class="ms-1">Xóa</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal patient info -->
        <Contact :patientInfo="patientActive" />
        <!-- /modal patient info -->
    </div>
</template>
<script>
import { ref } from 'vue';
import { useCurrentsRole } from "~~/services/common.js";

import PostIcon from "~~/assets/images/icons/PostIcon.vue";
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import IconDocumentation from "~~/assets/images/icons/IconDocumentation.vue";
import {ROLES} from "~~/constants/roles.js";
import { displayLocalDate } from "~~/constants/format-date.js";
import Contact from '~~/components/common/modal/patientInfo/contact.vue';
import PatientService from "~~/services/model/patient.service";

export default {
    components: {
        EditIcon,
        DeleteIcon,
        PostIcon,
        IconDocumentation,
        Contact
    },
    props: ["headers", "items", "actionEdit", "actionDelete", "page", "size", "routerPush"],
    setup(props, {emit}) {
        const currentRole = useCurrentRole();
        const { $showToast } = useNuxtApp();
        const patientActive = ref({});

        const displayGender = (gender) => gender == 0 ? "Nam" : "Nữ";

        function deletePatient(id) {

        }

        function setPatientActive(patientId) {
            if (patientId) {
                PatientService.getPatientInfoByPatientId(patientId)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) patientActive.value = responseData;
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });
            }
        }

        return {
            ROLES,
            currentRole,
            patientActive,

            useCurrentsRole,
            deletePatient,
            displayGender,
            displayLocalDate,
            setPatientActive
        }
    }
}
</script>
<style lang="scss">
    
</style>