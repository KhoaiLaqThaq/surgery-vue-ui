<template>
    <div class="form-check" 
        :class="{ 'form-switch': formSwitch }">
        <input class="form-check-input"
            type="checkbox"
            :name="name"
        >
        <label :class="textSize">{{ placeholder }}</label>
    </div>
</template>
<script>
export default {
    props: [
        'formSwitch',    // style switc `formSwitch?`
        'placeholder',
        'name',
        'textSize'
    ]
}
</script>
<style lang="">
    
</style>