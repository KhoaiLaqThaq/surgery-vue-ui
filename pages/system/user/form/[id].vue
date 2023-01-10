<template>
    <UserForm class="mt-3" :id="id" :user="user" />
</template>
<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import UserForm from "~~/components/form/UserForm.vue";
import UserService from "~~/services/model/user.service";

export default {
    components: {UserForm},
    setup() {
        const { $showToast } = useNuxtApp();
        const route = useRoute();
        const id = computed(() => route.params?.id);
        const user = ref({});

        function getUserById() {
            if (id.value) {
                UserService.getById(id.value)
                .then(response => {
                    let responseData = response.data;
                    if (responseData) user.value = responseData;
                })
                .catch((error) => {
                    $showToast("Tải thông tin người dùng không thành công!", "error", 2000);
                    console.log("Error: ", error);
                });
            }
        }

        return {
            id, 
            user,

            getUserById
        }
    },
    created() {
        this.getUserById();
    }
};
</script>
<style lang="scss"></style>
  