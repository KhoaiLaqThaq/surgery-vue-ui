<template>
    <form>
        <div class="tabs-container">
            <ul>
                <li class="tabs__item" @click="navigateToUserForm()">Thông tin người dùng</li>
                <li class="tabs__item selected ">Phân quyền</li>
            </ul>
            <div class="tabs__content">
                <div class="form-group bg-white">
                    <div class="card radius-unset mb-0 box">
                        <div class="card-body">
                        <div class="row mt-3 pb-0">
                            <div class="col-12">
                            <div class="row gx-2">
                                <div class="col-6">
                                <div class="form-floating mb-3">
                                    <select v-model="k6kGroupName" class="form-select" required="required">
                                        <option v-for="(groupUser, index) in groupUsers" :key="index" :value="groupUser.name">
                                            {{ groupUser.name }}
                                        </option>
                                    </select>
                                    <label>Chọn nhóm quyền <span class="text-danger">*</span></label>
                                </div>
                                </div>

                                <div class="col-6">
                                <div class="form-floating mb-3">
                                    <select v-model="departmentId" class="form-select" required="required">
                                        <option v-for="(department, index) in departments" :key="index" :value="department.id">
                                            {{ department.name }}
                                        </option>
                                    </select>
                                    <label>Chọn phòng ban <span class="text-danger">*</span></label>
                                </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row pb-0">
                                <div class="col-12 text-right">
                                    <button class="btn btn-primary ms-auto text-small" type='button' @click="onAuthority()" v-if="useCurrentsRole(currentRole, [ROLES.ROLE_ADMIN, ROLES.ROLE_USER_SET_AUTHORITY])">Phân quyền</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
// components
import BaseSelect from "~~/components/common/BaseSelect.vue";
import TitleHeader from "~~/components/common/TitleHeader.vue";
import FloatSelect from "~~/components/common/FloatSelect.vue";
import MultiCheckboxVue from "~~/components/common/MultiCheckbox.vue";

import {ROLES} from "~~/constants/roles.js";
import { useCurrentsRole } from '~~/services/common.js'
import UserDepartService from "~~/services/model/userDepart.service";
import UserService from "~~/services/model/user.service";
import DepartmentService from "~~/services/model/department.service";
export default {
    components: [
        TitleHeader,
        FloatSelect,
        BaseSelect,
        MultiCheckboxVue
    ],
    setup() {
        const route = useRoute();
        const userId = ref(route.params && route.params.id);
        const { $showToast } = useNuxtApp();

        // kiểm tra có phải lần đầu phân quyền thì sẽ tự động active tài khoản
        const firstTimeAuthority = ref(true);
        const k6kGroupName = ref("");
        const departmentId = ref("");
        const groupUsers = ref([]);
        const departments = ref([]);
        const currentRole = useCurrentRole();
        const userDepartment = ref(null);

        // TODO: init loading
        function initLoad() {
            if (userId) {
                onLoadUserDepartmentByK6kUserId();
                onLoadGroupUsers();
                onLoadDepartments();
            }
        }

        // TODO: Lấy thông tin đã tồn tại của user theo K6kUserId
        function onLoadUserDepartmentByK6kUserId() {
            UserDepartService.getById(userId.value).then((response) => {
                let responseData = response.data;
                if (responseData) {
                    // console.log("responseData: ", responseData);
                    userDepartment.value = responseData;
                    k6kGroupName.value = responseData.groupName;
                    firstTimeAuthority.value = responseData.groupName ? false : true;
                    departmentId.value = responseData.departmentId;
                } else onLoadUserError("Tải thông tin người dùng không thành công -1.");
            })
            .catch((error) => {
                onLoadUserError("Tải thông tin người dùng không thành công -1");
                console.log("LOAD USER ERROR: ", error);
            });
        }

        // TODO: Lấy danh sách nhóm quyền trên keycloak
        function onLoadGroupUsers() {
            UserService.getAllGroup().then((response) => {
                let responseData = response.data;
                if (responseData) {
                    groupUsers.value = responseData;
                }
            })
            .catch((error) => {
                onLoadUserError("Tải thông tin nhóm người dùng thất bại");
                console.log("LOAD USER K6k ERROR: ", error);
            });
        }

        // TODO: Lấy danh sách các phòng ban
        function onLoadDepartments() {
            DepartmentService.getAll().then((response) => {
                let responseData = response.data;
                if (responseData) {
                    departments.value = responseData;
                }
            })
            .catch((error) => {
                onLoadUserError("Tải thông tin danh sách phòng ban thất bại");
                console.log("LOAD departments ERROR: ", error);
            });
        }

        function updateGroupUser() {
            let dataExist = userDepartment.value;
            let dataGroupUser = {
                id: dataExist.k6kUserId,
                username: dataExist.username,
                email: dataExist.email,
                firstName: dataExist.firstName,
                lastName: dataExist.lastName,
                accountEnabled: firstTimeAuthority.value ? true : dataExist.enabled,
                groupName: k6kGroupName.value
            };

            UserService.update(userId.value, dataGroupUser).then((response) => {
                let responseData = response.data;
                if (responseData) {
                    console.log("update group user: ", responseData);
                    updateUserDepartment(responseData);
                }
            })
            .catch((error) => {
                onSaveUserError("Phân quyền người dùng thất bại, code: -1");
                console.log("SAVE USER ERROR -1: ", error);
            })
        }

        function updateUserDepartment(responseK6kGroup) {
            let dataUserExist = userDepartment.value;
            let dataUserDepartment = {
                id: dataUserExist.id,
                departmentId: departmentId.value,
                username: dataUserExist.username,
                email: dataUserExist.email,
                firstName: dataUserExist.firstName,
                lastName: dataUserExist.lastName,
                groupName: k6kGroupName.value,
                enabled: firstTimeAuthority.value ? true : dataUserExist.enabled,
                k6kUserId: userId.value,
                k6kGroupId: responseK6kGroup.groupId
            };

            UserDepartService.update(departmentId.value, dataUserDepartment).then((response) => {
                let responseUserDepartment = response.data;
                if (responseUserDepartment) {
                    $showToast("Phân quyền người dùng thành công", "success", 3000);
                    navigateTo("/system/user");
                }
            })
            .catch((error) => {
                onSaveUserError("Phân quyền người dùng thất bại, code: -2");
                console.log('SAVE USER ERROR -2: ', error);
            })
        }

        function onAuthority() {
            if (k6kGroupName.value && departmentId.value) {
                updateGroupUser();
            } else $showToast("Yêu cầu điền đầy đủ thông tin trong mẫu", "warning", 3000);
        }

        function navigateToUserForm() {
            navigateTo("/system/user/form/" + userId.value)
        }

        function onLoadUserError(message) {
            $showToast(message, "error", 3000);
            navigateTo("/system/user");
        }

        function onSaveUserError(message) {
            $showToast(message, "error", 3000);
        }

        return {
            k6kGroupName,
            departmentId,
            groupUsers,
            departments,
            currentRole,
            ROLES,

            onAuthority,
            navigateToUserForm,
            initLoad,
            useCurrentsRole
        }
    },
    created() {
        this.initLoad();
    }
}
</script>
<style lang="">
    
</style>