<template>
    <div class="mt-3">
        <SessionForm :id="sessionId" :session="session" />
    </div>
</template>
<script>
import {ref} from 'vue';
import { useRoute } from 'vue-router';

import SessionForm from '~~/components/form/SessionForm.vue';
import SessionService from '~~/services/model/session.service'
export default {
    components: { SessionForm },
    setup() {
        const { $showToast } = useNuxtApp();
        const route = useRoute();
        const sessionId = ref(route.params?.id);
        const session = ref({});

        function getSessionById() {
            if (sessionId.value) {
                SessionService.getById(sessionId.value)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        session.value = responseData;
                    }
                })
                .catch((error) => {
                    $showToast("Tải phiên khám không thành công!", "error", 2000);
                    console.log("Error: ", error);
                });
            }
        }

        return {
            sessionId,
            session,

            getSessionById
        }
        
    },
    created() {
        this.getSessionById();
    }
}
</script>
<style lang="">
    
</style>