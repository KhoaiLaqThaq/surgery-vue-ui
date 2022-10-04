<template>
    <div class="table-container">
        <div class="tr">
            <div class="th" v-for="(item, index) in headers" :key="index" :class="item.classCss">{{item.text}}</div>
            <div class="th pe-3" v-if="actionEdit || actionDelete">Hành động</div>
        </div>

        <div class="tr" v-for="(item, index) in items" :key="index">
            <div class="td text-center">{{ index + 1 + page * size }}</div>

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

export default {
    components: {
        EditIcon, DeleteIcon
    },
    props: ["headers", "items", "actionEdit", "actionDelete", "page", "size", "routerPush"],
    setup() {

        function deleteSession(sessionId) {

        }

        return {
            deleteSession
        }
    }
}
</script>
<style lang="scss">
    
</style>