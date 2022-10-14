<template>
    <div class="modal fade" id="treatmentPlan" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header mb-3">
                    <div class="modal-title">Chi tiết điều trị</div>
                    <button type="button" id="modal-close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body mb-3">
                    <div class="row">
                        <div class="col-12">
                            <textarea class="minH-200 w100 auto-scroll-y" disabled :value="treatmentPlan"></textarea>
                        </div>
                    </div>
                </div>

                <div class="confirm-footer">
                    <button class="btn btn-primary radius-unset" @click="onClickToCloseModal()">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["treatmentPlan"],
    setup() {
        const onClickToCloseModal = () => document.getElementById('modal-close').click();

        return {
            onClickToCloseModal
        }
    }
}
</script>
<style lang="">
    
</style>