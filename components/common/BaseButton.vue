<template>
    <button class="btn px-3"
        :type="btnType"
    >
        <SendIcon class="w-4" />
        <span :class="textSize" class="ps-2">{{ name }}</span>
    </button>
</template>
<script>
import SendIcon from '~~/assets/images/icons/actions/SendIcon.vue';
export default {
    props: [
        "btnType",
        "name",
        "textSize"
    ],
    components: { SendIcon }
}
</script>
<style lang="">
    
</style>