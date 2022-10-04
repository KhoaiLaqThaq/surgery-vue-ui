<template>
    <div class="mb-3">
        <label class="form-label" :class="textSize">{{ name }} <span v-if="name" :class="{'text-danger': required}">*</span></label>
        <input class="form-control"
            :type="type"
            :placeholder="placeholder"
            :value="value">
    </div>
</template>
<script>
export default {
    props: [
        'type',
        'placeholder',
        'value',
        'name',
        'required',
        'textSize'
    ]
}
</script>
<style lang="">
    
</style>