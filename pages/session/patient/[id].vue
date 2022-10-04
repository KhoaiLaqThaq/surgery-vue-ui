<template>
    <div class="mt-3">
        <div class="d-flex">
            <TitleHeader :title="titlePage + patientName" />
        </div>
    </div>
</template>
<script>
import {ref} from 'vue';
import { useRoute } from 'vue-router';

import TitleHeader from '~~/components/common/TitleHeader.vue';
import SessionService from '~~/services/model/session.service';

export default {
    components: { TitleHeader },
    data() {
        return {
            titlePage: "Danh sách phiên khám của bệnh nhân: "
        }
    },
    setup() {
        const route = useRoute();
        const { $showToast } = useNuxtApp();
        const patientName = ref("");
        const session = ref([]);
        const patientId = ref(route.params && route.params.id);

        function onLoadSessionByPatientId() {
            if (patientId.value) {
                SessionService.getAllByPatientId(patientId.value)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {

                    }
                })
                .catch((error) => {
                    $showToast("Tải phiên khám không thành công", "error", 2000);
                    console.log("Error: ", error);
                })
            }
        }


        return {
            patientName,

            onLoadSessionByPatientId
        }
    },
    created() {
        this.onLoadSessionByPatientId();
    }
}
</script>
<style lang="scss" scoped>
    
</style>