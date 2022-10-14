<template>
    <div class="mt-3">
        <div class="auth-wrapper">
            <div class="auth-content">
                <div class="auth-bg">
                    <span class="r"></span>
                    <span class="r s"></span>
                    <span class="r s"></span>
                    <span class="r"></span>
                </div>
                <div class="card box bgc-none">
                    <div class="card-body text-center">
                        <h1>404: Không tồn tại trang này!</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .auth-wrapper {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        overflow: hidden;
        min-width: 100%;
        min-height: 100vh;

        .auth-content {
            position: relative;
            width: 390px;
            padding: 15px;
            z-index: 5;
        }
    }
    .auth-wrapper .auth-bg .r {
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
    }
    .auth-wrapper .auth-bg .r:first-child {
        top: -100px;
        right: -100px;
        background: linear-gradient(-135deg, #1de9b6 0%, #1dc4e9 100%);
    }

    .auth-wrapper .auth-bg .r:nth-child(2n+1) {
        -webkit-animation: floating 7s infinite;
        animation: floating 7s infinite;
    }

    .auth-wrapper .auth-bg .r.s:nth-child(2) {
        top: 150px;
        right: -150px;
        background: #04a9f5;
    }
    .auth-wrapper .auth-bg .r:nth-child(2n) {
        -webkit-animation: floating 9s infinite;
        animation: floating 9s infinite;
    }
    .auth-wrapper .auth-bg .r.s {
        width: 20px;
        height: 20px;
    }
    .auth-wrapper .auth-bg .r {
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
    }
    .auth-wrapper .auth-bg .r.s:nth-child(3) {
        left: -150px;
        bottom: 150px;
        background: #1de9b6;
    }
    .auth-wrapper .auth-bg .r:nth-child(2n+1) {
        -webkit-animation: floating 7s infinite;
        animation: floating 7s infinite;
    }
    .auth-wrapper .auth-bg .r:last-child {
        left: -100px;
        bottom: -100px;
        background: linear-gradient(-135deg, #899FD4 0%, #A389D4 100%);
    }
</style>