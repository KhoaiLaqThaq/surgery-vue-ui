<template>
    <div class="modal fade" :id="idModal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Bạn có chắc chắn điều này?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetModal()"></button>
                </div>
                <div class="modal-body">
                    <p>Hành động này <strong>không thể</strong> được hoàn tác. Thao tác này sẽ xóa vĩnh viễn {{objectType}} <strong>{{objectName}}</strong>. {{issueText}}.</p>
                    <p>Vui lòng gõ <strong id="txtObjectName">{{objectName}}</strong> để xác nhận.</p>
                    <div class="w100">
                        <input type="text" class="form-control mb-2" v-model="confirmAction"
                            @keyup="resetNotification()"
                        />
                        <p id="titleMessageNotification" class="fw-bold text-danger"></p>
                        <button type="button" class="btn btn-secondary text-white fw-bold p-2 w100" 
                            @click="confirmDelete()" :disabled="confirmAction.length == 0"
                        >{{btnTitleConfirm}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, watch } from "vue";

export default {
    props: ["idModal", "objectName", "objectType", "issueText", "btnTitleConfirm"],
    setup(props, {emit}) {
        const confirmAction = ref("");

        function confirmDelete() {
            let notificationSelector = document.getElementById("titleMessageNotification");
            let objectName = document.getElementById("txtObjectName").textContent;
            if (confirmAction.value.length > 0 && confirmAction.value === objectName) {
                emit("func-delete")
            } else {
                notificationSelector.innerText = "Xác nhận không chính xác, vui lòng thử lại."
            }
            
        }

        function resetNotification () {
            let notificationSelector = document.getElementById("titleMessageNotification");
            if (notificationSelector && notificationSelector.textContent && notificationSelector.textContent.length > 0)
                notificationSelector.innerText = "";
        }

        function resetModal() {
            resetNotification();
            confirmAction.value = "";
        }

        return {
            confirmAction,

            resetModal,
            confirmDelete,
            resetNotification
        }
    }
}
</script>
<style lang="">
    
</style>