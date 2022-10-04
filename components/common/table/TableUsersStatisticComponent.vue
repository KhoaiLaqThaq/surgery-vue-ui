<template>
    <div class="table-container bg-white">
        <div class="tr">
            <div class="th">STT</div>
            <div class="th">Phòng ban</div>
            <div class="th">Tổng số</div>
            <div class="th text-center">Được kích hoạt</div>
            <div class="th">Chưa được kích hoạt</div>
        </div>
        <div class="tr" v-for="(item, index) in items" :key="index">
            <div class="td">{{ index + 1 + page*size }}</div>
            <div class="td">{{ item.departmentName }}</div>
            <div class="td fw-bold text-center">{{ item.totalUserByDepartment }}</div>
            <div class="td text-center">{{item.amountUserByDepartment}}</div>
            <div class="td">{{item.amountUserInactiveByDepartment}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["headers", "items", "page", "size", "totalUserActive", "totalUserInactive"]
}
</script>
<style lang="">
    
</style>