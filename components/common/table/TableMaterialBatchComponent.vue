<template>
    <div class="table-container">
        <div class="tr">
            <div class="th" v-for="(item, index) in headers" :key="index" :class="item.classCss">{{item.text}}</div>
            <div class="mx-0 text-center th" v-if="actionEdit || actionDelete">Hành động</div>
        </div>

        <div class="tr" v-for="(item, index) in items" :key="index">
            <div class="td hidden-xs">{{index + 1 + page * size}}</div>
            <div class="td hidden-xs">{{ item.code }}</div>
            <div class="td radius-xs-top-left-20">{{ item.name }}</div>
            <div class="td">{{ displayTextTooLong(125, item.composition) }}</div>
            <div class="td"><span class="d-flex">{{ item.price }} ₫</span></div>
            <div class="td"><span class="d-flex">{{ item.sales }} ₫</span></div>
            <div class="td px-0 text-center" v-if="actionEdit || actionDelete">
                <div class="d-flex me-0">
                    <div class="m-auto cursor-pointer" v-if="actionEdit">
                        <NuxtLink :to="routerPush + '/' + item.id" class="d-flex">
                            <EditIcon /><span class="ms-1">Sửa</span>
                        </NuxtLink>
                    </div>
                    <div class="d-flex me-3 cursor-pointer ms-3 text-danger" v-if="actionDelete">
                        <DeleteIcon /><span class="ms-1">Xóa</span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import EditIcon from "~~/assets/images/icons/actions/EditIcon.vue";
import DeleteIcon from "~~/assets/images/icons/actions/DeleteIcon.vue";
export default {
    props: ["headers", "items", "actionEdit", "actionDelete", "routerPush", "page", "size"],
    components: { EditIcon, DeleteIcon},
}
</script>
<style lang="">
    
</style>