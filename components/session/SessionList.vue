<template>
    <div>
        <div class="session-container">
            <div class="session-header mb-3">
                <div class="session-btn bg-white text-white w100 text-slate-600 zoom-in" @click="addSession()">
                    <Edit3Icon class="w-4 h-4" /> <span class="ps-2">Thêm phiên khám</span>
                </div>
            </div>
            <div class="session-items">
                <div class="item fw-bold zoom-in" :class="index == 0 ? 'active':''" :id="'session_' + session.id"
                    v-for="(session, index) in sessionList" :key="index"
                    @click="setSessionActive(session.id)"
                >
                    <span>{{displayLocalDate_DDMMYYYY(session.createdDate)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { displayLocalDate_DDMMYYYY } from '~~/constants/format-date.js';
import Edit3Icon from "~~/assets/images/icons/actions/Edit3Icon.vue";

export default {
    components: {Edit3Icon},
    props: ["sessionList"],
    setup(props, {emit}) {
        const addSession = () => navigateTo("/session/form");

        function setSessionActive(sessionId) {
            emit('onchangeSessionActive', sessionId);
            onChangeStyleActive(sessionId);
        }

        function onChangeStyleActive(sessionId) {
            let items = document.getElementsByClassName("item");
            for (let i = 0; i < items.length; i++) {
                let element = items[i];
                element.classList.remove("active");
            }
            document.getElementById("session_" + sessionId).classList.add("active");
        }

        return {
            displayLocalDate_DDMMYYYY,
            addSession,
            setSessionActive
        }
    },
}
</script>
<style lang="scss">
.session-container {
    background-color: #1e40af;
    // color: #fff;
    border-radius: 5px;
    padding: 15px;

    .session-header {
        
        .session-btn {
            cursor: pointer;
            padding: 10px ;
            text-align: center;
            color: #014683 !important;
            border-radius: 5px;
        }
    }
    .session-items {
        border-top: 1px solid #ffffff1a;
        color: #fff;
        padding-top: 1rem;
        .item {
            text-align: center;
            padding: 10px;
            cursor: pointer;
            border-radius: 5px;
            &.active, &:hover {
                background-color: #ffffff1a;
            }
            
        }
    }
}
.text-slate-600 {
    --tw-text-opacity: 1;
    color: rgb(var(--color-slate-600) / var(--tw-text-opacity));
}
</style>