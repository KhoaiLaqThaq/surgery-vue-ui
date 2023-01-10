<template>
    <div>
        <div class="session-container__detail">
            <div class="session-header">
                <div class="d-flex">
                    <div class="title fw-bold">{{ $t('label.session.detail') }}</div>
                    <div class="header-items ms-auto text-primary cursor-pointer">
                        <div class="prescription" @click="onClickToGetPrescriptions(session.id)" data-bs-toggle="modal" data-bs-target="#prescriptionModal">
                            <PostIcon class="w-4" /> <span class="pd-2">Đơn thuốc</span>
                        </div>
                    </div>
                    <PrescriptionList :prescriptions="prescriptions" />
                </div>
            </div>
        </div>
        <div class="session-body pt-3">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <div class="form-group">
                        <label>{{ $t('label.session.code') }}:</label><span class="ps-3">{{ session.code }}</span>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>{{ $t('label.session.diagnosis') }}: </label><span class="ps-3">{{ session.diagnosis }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>{{ $t('label.session.symptom') }}: </label><span class="ps-3">{{ session.symptom }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>{{ $t('label.session.bloodPressure') }}:</label><span class="ps-3">{{ session.bloodPressure }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>{{ $t('label.session.leftEye') }}:</label><span class="ps-3">{{ session.leftEye }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>{{ $t('label.session.rightEye') }}:</label><span class="ps-3">{{ session.rightEye }}</span>
                </div>
                <div class="col-12 mb-3">
                    <label>{{ $t('label.session.treatmentPlan') }}:</label>
                    <textarea class="form-control h-auto minH-200 auto-scroll-y" disabled :value="session.treatmentPlan"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <label>{{ $t('label.session.note') }}:</label>
                    <p v-if="session.note">{{ session.note }}</p>
                    <p v-else>Updating...</p>
                </div>
                
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <div class="form-group">
                        <label>{{ $t('label.session.status') }}:</label>
                        <span class="ps-3">{{ displaySessionStatus(session.status) }}</span>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>{{ $t('label.session.nextTime') }}:</label>
                    <span v-if="session.nextTime" class="ps-3">{{ displayLocalDate_DDMMYYYY(session.nextTime) }}</span>
                    <span v-else class="ps-3 text-warning">Không có</span>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>Thành tiền:</label>
                    <span class="ps-3 fw-bold text-lg" v-if="session.totalPrice">{{ $n(session.totalPrice) }} ₫</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import PostIcon from "~~/assets/images/icons/PostIcon.vue";

import { displayLocalDate_DDMMYYYY } from "~~/constants/format-date.js";
import PrescriptionService from "~~/services/model/prescription.service";
import PrescriptionList from '~~/components/common/modal/prescription/PrescriptionList.vue';

export default {
    components: {
        PostIcon,
        PrescriptionList
    },
    props: ["session"],
    setup() {
        const prescriptions = ref([]);

        function displaySessionStatus(status) {
            if (status == 0)
                return "Khám xong";
            else if (status == 1)
                return "Tái khám";
            else
                return "Khám bình thường";
        }

        function onClickToGetPrescriptions(sessionId) {
            if (sessionId) {
                PrescriptionService.getAllBySessionId(sessionId)
                .then((response) => {
                    let responseData = response.data;
                    if (responseData) prescriptions.value = responseData;
                })
                .catch((error) => {
                    console.log("Error: ", error);
                });
            }
        }

        return {
            prescriptions,

            displayLocalDate_DDMMYYYY,
            displaySessionStatus,
            onClickToGetPrescriptions
        }
    }
}
</script>
<style lang="scss">
.session-container__detail {
    padding: 15px;
    border-bottom: 1px solid rgb(52 44 44 / 10%);

    // .header-items {

    // }
}
</style>