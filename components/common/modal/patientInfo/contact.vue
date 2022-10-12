<template>
    <div class="modal fade" id="contactUs" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Thông tin liên hệ</h5>
                    <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="table-container">
                        <div class="tr">
                            <div class="th">Người thân</div>
                            <div class="th">Tên</div>
                            <div class="th">Số điện thoại</div>
                        </div>
                        <div class="tr">
                            <div class="td">Bố</div>
                            <div class="td">{{ patientInfo.fname }}</div>
                            <div class="td"><a :href="'tel:' + patientInfo.fphone">{{ patientInfo.fphone }}</a></div>
                        </div>
                        <div class="tr">
                            <div class="td">Mẹ</div>
                            <div class="td">{{ patientInfo.mname }}</div>
                            <div class="td"><a :href="'tel:' + patientInfo.mphone">{{ patientInfo.mphone }}</a></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["patientInfo"]
}
</script>
<style lang="scss">
    
</style>