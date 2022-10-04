<template>
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 999;">
        <div id="liveToast" class="toast" :class="message ? 'show':'hide'" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Thông báo</strong>
                <!-- <small>11 mins ago</small> -->
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body text-white rounded-bottom-5" :class="isSuccess ? 'bg-success':'bg-danger'">
                {{ message ? message : 'Nội dung thông báo' }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["message", "isSuccess"]
}
</script>
<style lang="">
    
</style>
