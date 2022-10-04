<template>
    <div class="table-container bg-white">
        <div class="tr">
            <div class="th">STT</div>
            <div class="th">Chuyên mục</div>
            <div class="th">Số lượng tin</div>
        </div>
        <div class="tr" v-for="(item, index) in items" :key="index">
            <div class="td">{{ index + 1 + page*size }}</div>
            <div class="td">{{ item.topicName }}</div>
            <div class="td">{{item.amountNewsByTopic}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["headers", "items", "page", "size"]
}
</script>
<style lang="">
    
</style>