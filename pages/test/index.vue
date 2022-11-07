<template>
    <div>
        <Demo  v-bind="post" />
    </div>
</template>
<script>
import Demo from "~~/pages/test/demo/index.vue";

export default {
    components: {
        Demo
    },
    setup() {
        const post = {
            id: 1,
            title: "My journey with Vue",
        }

        return {
            post
        }
    }
}
</script>
<style lang="scss">
    
</style>