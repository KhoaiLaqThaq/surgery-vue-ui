<template>
    <Form @submit="onSubmit()">
        <div class="row mb-3">
            <!-- username -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="text" class="form-control box border-none"
                        v-model="user.username" name="username" :rules="validateRequired"
                        :disabled="userId"
                    />
                    <ErrorMessage name="username" class="text-danger" />
                    <label for="">Tên đăng nhập <span class="text-danger">*</span></label>
                </div>
            </div>
            <!-- /username -->
            <!-- email -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="email" class="form-control box border-none" v-model="user.email" name="email" />
                    <label for="">Email</label>
                </div>
            </div>
            <!-- /email -->

            <!-- fullname -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="form-floating">
                    <Field type="fullname" class="form-control box border-none" v-model="user.fullname" name="fullname" />
                    <label for="">Họ và tên</label>
                </div>
            </div>
            <!-- /fullname -->
        </div>
        <div class="row">
            <!-- enabled -->
            <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                <div class="col-6">
                    <label for="">Kích hoạt tài khoản</label>
                    <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input cursor-pointer" v-model="user.enabled" role="switch"/>
                    </div>
                </div>
            </div>
            <!-- /enabled -->
        </div>
        <hr>
        <div class="row pb-0">
            <div class="col-6">
                <BackButton class="btn-primary box ms-auto" :btnType="'button'" :name="'Quay lại'" :textSize="'text-small'" :routePush="'/system/user'"/>
            </div>
            <div class="col-6 text-right">
                <BaseButton class="btn-primary box ms-auto" :btnType="'submit'" :name="'Lưu'" :textSize="'text-small'" />
            </div>
        </div>
    </Form>
</template>
<script>
import { ref, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage } from "vee-validate";

import BaseButton from '~~/components/common/BaseButton.vue';
import BackButton from '~~/components/common/BackButton.vue';

import UserService from '~~/services/model/user.service';
import {validateRequired, validateSelect} from '~~/services/common.js';

export default {
    props: ["id", "user"],
    components: { Form, Field, ErrorMessage, BaseButton, BackButton },
    setup(props) {
        const { $showToast } = useNuxtApp();
        const userId = ref(null);
        const user = reactive({
            username: '',
            email: '',
            fullname: '',
            enabled: true,
            createdBy: '',
            createdDate: null
        });
        
        watch(props, () => setUserExisted());

        function setUserExisted() {
            let userExisted = props.user;
            if (userExisted) {
                userId.value = userExisted.id;
                userExisted.username = userExisted.username;
                userExisted.email = userExisted.email;
                userExisted.fullname = userExisted.fullname;
                userExisted.enabled = userExisted.enabled;
                userExisted.createdBy = userExisted.createdBy;
                userExisted.createdDate = userExisted.createdDate;
            }
        }

        function onSubmit() {
            let userData = {
                id: userId.value,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                enabled: user.enabled
            };

            UserService.saveOrUpdate(userData)
            .then(response => {
                let responseData = response.data;
                if (responseData) {
                    $showToast("Lưu thông tin thành công!", "success", 2000);
                    navigateTo("/system/user");
                }
            })
            .catch(error => {
                console.log("Error: ", error);
                $showToast("Lưu thông tin không thành công!", "error", 2000);
            })
        }

        return {
            userId,
            user,

            onSubmit,
            validateRequired,
            validateSelect
        }
    }
};
</script>
<style lang="scss"></style>
