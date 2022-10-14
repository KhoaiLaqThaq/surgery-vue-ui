<template>
    <button class="btn px-3 zoom-in"
        :type="btnType"
        @click="navigate()"
    >
        <ArrowLeftIcon class="w-4" />
        <span :class="textSize" class="ps-2">{{ name }}</span>
    </button>
</template>
<script>
import ArrowLeftIcon from '~~/assets/images/icons/ArrowLeftIcon.vue';
export default {
    props: [
        "btnType",
        "name",
        "textSize",
        "routePush"
    ],
    components: { ArrowLeftIcon },
    setup(props) {

        const navigate = () => navigateTo(props.routePush);

        return {
            navigate
        }
    }
}
</script>
<style lang="">
    
</style>