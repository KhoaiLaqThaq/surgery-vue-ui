<template>
    <div>
        <div class="session-container__detail">
            <div class="session-header">
                <div class="d-flex">
                    <div class="title fw-bold">Chi tiết phiên khám</div>
                    <div class="header-items ms-auto text-primary cursor-pointer">
                        <div class="prescription">
                            <PostIcon class="w-4" /> <span class="pd-2">Đơn thuốc</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="session-body pt-3">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <div class="form-group">
                        <label>Mã:</label><span class="ps-3">{{ session.code }}</span>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>Chuẩn đoán: </label><span class="ps-3">{{ session.diagnosis }}</span>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>Triệu chứng: </label><span class="ps-3">{{ session.symptom }}</span>
                </div>
                <div class="col-12 mb-3">
                    <label>Pháp đồ điều trị:</label>
                    <textarea class="form-control h-auto minH-200 auto-scroll-y" disabled :value="session.treatmentPlan"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <label>Ghi chú:</label>
                    <p v-if="session.note">{{ session.note }}</p>
                    <p v-else>Updating...</p>
                </div>
                
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <div class="form-group">
                        <label>Trạng thái:</label>
                        <span class="ps-3">{{ displaySessionStatus(session.status) }}</span>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-xs-12 mb-3">
                    <label>Lịch tái khám:</label>
                    <span v-if="session.nextTime" class="ps-3">{{ displayLocalDate_DDMMYYYY(session.nextTime) }}</span>
                    <span v-else class="ps-3 text-warning">Không có</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PostIcon from "~~/assets/images/icons/PostIcon.vue";

import { displayLocalDate_DDMMYYYY } from "~~/constants/format-date.js";

export default {
    components: {
        PostIcon
    },
    props: ["session"],
    setup() {

        function displaySessionStatus(status) {
            if (status == 0)
                return "Khám xong";
            else if (status == 1)
                return "Tái khám";
            else
                return "Khám bình thường";
        }

        return {
            displayLocalDate_DDMMYYYY,
            displaySessionStatus
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