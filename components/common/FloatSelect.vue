<template>
    <div class="form-floating">
        <select class="form-select"
            :value="value" @input="changeValue($event)"
            :required="required">
            <option value="" v-if="selectOfferTitle">{{ selectOfferTitle }}</option>
            <option v-for="(option, index) in options"
                :key="index"
                :value="optionId ? option[optionId] : option">
                {{ option instanceof Object ? option[name] : option }}
            </option>
        </select>
        <label for="">{{placeholder}} <span :class="{'text-danger': required}">*</span></label>
    </div>
</template>
<script>
export default {
    props: [
        'placeholder',
        'selectOfferTitle',
        'required',
        'value',
        'options',
        'name',
        'optionId'
    ],
    emits: ['update:value'],
    setup(props) {
        function changeValue(e) {
            emit('update:value', e.target.value);
        }

        return {
            changeValue
        }
    }
}
</script>
<style lang="">
    
</style>