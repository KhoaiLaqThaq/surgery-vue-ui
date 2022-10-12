<template>
    <div class="mt-3">
        <div class="d-flex mb-3">
            <TitleHeader :title="titlePage" />
            <span class="ps-3 text-lg fw-bold">{{ patient.name }}</span>
        </div>
        <div class="row">
            <SessionList
                class="col-lg-3 col-md-3 col-xs-12" 
                :sessionList="sessionList" 
                @onchangeSessionActive="setSessionActive($event)"
            />
            <SessionDetail
                class="col-lg-9 col-md-9 col-xs-12 bg-white radius-5 box"
                :session="sessionActive"
            />
        </div>
    </div>
</template>
<script>
import {ref} from 'vue';
import { useRoute } from 'vue-router';

import TabsWrapper from "~~/components/common/tab/TabsWrapper.vue";
import TabItem from "~~/components/common/tab/TabItem.vue";
import TitleHeader from '~~/components/common/TitleHeader.vue';
import SessionList from "~~/components/session/SessionList.vue";
import SessionDetail from "~~/components/session/SessionDetail.vue";

import {displayLocalDate_DDMMYYYY} from "~~/constants/format-date.js";
import SessionService from '~~/services/model/session.service';
import PatientService from '~~/services/model/patient.service';

export default {
    components: { TitleHeader, TabItem, TabsWrapper, SessionList, SessionDetail },
    setup() {
        const route = useRoute();
        const { $showToast } = useNuxtApp();
        const patient = ref({});
        const sessionList = ref([]);
        const sessionActive = ref({});
        const patientId = ref(route.params && route.params.id);

        function onLoadPatientByPatientId() {
            if (patientId.value) {
                PatientService.getById(patientId.value)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        console.log(responseData);
                        patient.value = responseData
                    }
                })
                .catch((error) => {
                    $showToast("Tải thông tin bệnh nhân không thành công", "error", 2000);
                    console.log("Error: ", error);
                });
            }
        }

        function onLoadSessionByPatientId() {
            if (patientId.value) {
                SessionService.getAllByPatientId(patientId.value)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        sessionList.value = responseData;
                        if (responseData.length > 0) {
                            sessionActive.value = responseData[0];
                        }
                    }
                })
                .catch((error) => {
                    $showToast("Tải phiên khám không thành công", "error", 2000);
                    console.log("Error: ", error);
                })
            }
        }

        function setSessionActive(e) {
            if (e) {
                SessionService.getById(e)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) {
                        sessionActive.value  = responseData;
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });
            }
        }


        return {
            titlePage: "Danh sách phiên khám của bệnh nhân: ",
            patient,
            sessionList,
            sessionActive,

            displayLocalDate_DDMMYYYY,
            onLoadSessionByPatientId,
            onLoadPatientByPatientId,
            setSessionActive
        }
    },
    created() {
        this.onLoadSessionByPatientId();
        this.onLoadPatientByPatientId();
    }
}
</script>
<style lang="scss" scoped>
    
</style>