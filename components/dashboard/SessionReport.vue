<template>
    <div class="row">
        <div class="col-12 mb-3">
            <div class="title fw-bold text-lg">{{ $t('label.transaction.recents') }}</div>
        </div>
        <div class="col-12 px-4">
            <div class="row row-container border-2px zoom-in-little" 
                v-for="(session, index) in sessions"
                :key="index"
                @click="sessionDetail(session.id)"
            >
                <div class="col-8 td-item">
                    <div class="d-flex">
                        <!-- <PostIcon /> -->
                        <img src="@/assets/images/avatar/avatar1.jpg" class="w-8 h-8 rounded-full img-fit" alt="..." />
                        <div class="title ms-3 alignment-center">
                            <p class="fw-bold m-0">{{ session.patient?.name }}</p>
                            <p class="m-0 text-secondary">{{ displayLocalDate_DDMMYYYY(session.createdDate) }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-4 text-right alignment-center hidden-xs" v-if="session.totalPrice">
                    {{ $n(session.totalPrice) }} $
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="row-footer mx-auto zoom-in-little">{{ $t('label.showMore.text') }}</div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';

import SessionService from "~~/services/model/session.service";
import PostIcon from "~~/assets/images/icons/PostIcon.vue";
import { displayLocalDate_DDMMYYYY } from "~~/constants/format-date.js";

export default {
    components: {
        PostIcon
    },
    setup() {
        const sessions = ref([]);

        function findSessionsByTop5() {
            SessionService.getByTop5()
            .then((response) => {
                let responseData = response.data;
                if (responseData) {
                    sessions.value = responseData;
                }
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
        }

        function sessionDetail(sessionId) {
            navigateTo(`/session/form/${sessionId}`)
        }

        return {
            sessions,

            sessionDetail,
            findSessionsByTop5,
            displayLocalDate_DDMMYYYY
        }
    },
    mounted() {
        this.findSessionsByTop5();
    }
    
}
</script>
<style lang="scss">
.row-container {
    background-color: #fff;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 7px;
}
.row-footer {
    background-color: unset;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    text-align: center;
}
</style>