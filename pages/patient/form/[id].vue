<template>
    <div class="mt-3">
        <patient-form :id="patientId" :patient="patient"></patient-form>
    </div>
</template>
<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";


import PatientService from "~~/services/model/patient.service";
import PatientForm from "~~/components/form/PatientForm.vue";

export default {
    components: { PatientForm },
    setup(props) {
        const { $showToast } = useNuxtApp();
        const route = useRoute();
        const patientId = computed(() => route.params?.id);
        const patient = ref({});

        function getPatientById() {
            if (patientId.value) {
                PatientService.getById(patientId.value)
                .then((response) => {
                    let responseData = response.data;

                })
                .catch((error) => {
                    $showToast("Có lỗi khi tải thông tin bệnh nhân.", "error", 3000);
                    console.log("Error: ", error);
                })
            }
        }
    }
}
</script>
<style lang="scss">
    
</style>