<template>
    <div class="table-container">
        <div class="tr">
            <div class="th" v-for="(item, index) in headers" :key="index" :class="item.classCss">{{item.text}}</div>
            <div class="th pe-3" v-if="actionEdit || actionDelete">Hành động</div>
        </div>

        <div class="tr zoom-in-little" v-for="(item, index) in items" :key="index">
            <div class="td text-center">{{ index + 1 + page * size }}</div>
            <div class="td">{{ item.code }}</div>
            <div class="td">{{ item.diagnosis }}</div>
            <div class="td">{{ item.symptom }}</div>
            <div class="td text-primary cursor-pointer">Chi tiết</div>
            <div class="td">{{ displaySessionStatus(item.status) }}</div>
            <div class="td">{{ displayLocalDate_DDMMYYYY(item.createdDate) }}</div>

            <div class="td pe-3" v-if="actionEdit || actionDelete">
                <div class="action-group d-flex">
                    <nuxt-link :to="routerPush + item.id" v-if="actionEdit">
                        <EditIcon /> <span class="ms-1">Sửa</span>
                    </nuxt-link>
                    <div v-if="actionDelete" class="ms-3 cursor-pointer text-danger">
                        <delete-icon @click="deleteSession(item.id)" /> <span class="ms-1">Xóa</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ref, reactive} from "vue";

import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
import { displayLocalDate_DDMMYYYY } from "~~/constants/format-date.js";

export default {
    components: {
        EditIcon, DeleteIcon
    },
    props: ["headers", "items", "actionEdit", "actionDelete", "page", "size", "routerPush"],
    setup() {

        function deleteSession(sessionId) {

        }

        function displaySessionStatus(status) {
            if (status == 0)
                return "Khám xong";
            else if (status == 1)
                return "Tái khám";
            else
                return "Khám bình thường";
        }

        return {
            deleteSession,
            displaySessionStatus,
            displayLocalDate_DDMMYYYY
        }
    }
}
</script>
<style lang="scss">
    
</style>