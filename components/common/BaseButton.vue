<template>
    <button class="btn"
        :type="btnType"
    >
        <span :class="textSize">{{ name }}</span>
    </button>
</template>
<script>
export default {
    props: [
        'btnType',
        'name',
        'textSize'
    ]
}
</script>
<style lang="">
    
</style>