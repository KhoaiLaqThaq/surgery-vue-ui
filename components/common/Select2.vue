<template>
    <div class="position-relative">
        <div class="form-floating">
            <div class="container-select2__box form-control" @click="toggleSelect2(id)">
                <span class="select2__title">{{fieldName}}</span>
                <span class="ms-auto select2__icon"><ChevronDownIcon /> </span>
            </div>
            <span class="text-danger" v-if="required">{{messageRequired}}</span>
            <label for="">{{ title }} <span class="text-danger" v-if="required">*</span></label>
        </div>
        <div class="select2__items d-none auto-scroll-y" :id="'select__box_' + id">
            <ul class="p-0 auto-scroll-y w100">
                <li class="select2__searching">
                    <span class="select2_search"><SearchIcon /></span>
                    <input type="text" v-model="fieldValue" @input="autoSearching()" class="form-control" />
                </li>
                <li class="select2__item zoom-in-little"
                    v-for="(item, index) in items"
                    :key="index" 
                    @click="setSelectedItem(item, id)"
                >
                    {{ item.name != null ? displayAmountCharacters(25, item.name) : '' }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';

import { displayAmountCharacters } from '~~/constants/format-string.js';
import ChevronDownIcon from '~~/assets/images/icons/ChevronDownIcon.vue';
import SearchIcon from '~~/assets/images/icons/actions/SearchIcon.vue';
import { Message } from '~~/lang/message.js';

export default {
    components: { ChevronDownIcon, SearchIcon },
    props: [ "id", "required", "title", "items"],
    setup(props, { emit }) {
        const fieldValue = ref("");
        const fieldName = ref("");
        const messageRequired = ref(Message.required)
        /*
         * TODO: Auto `emit` to searching when the fieldValue was changed
         */
        const autoSearching = () => {
            emit("change-value", fieldValue.value.length > 0 ? fieldValue.value : '');
        }
        /*
         * TODO: Set value active when selected value
         * param: e - item selected
         */
        const setSelectedItem = (e, id) => {
            fieldName.value = e.name;
            document.getElementById("select__box_" + id).classList.toggle("d-none");
            e['index'] = id;
            emit("set-item-active", e);
        }

        /*
         * TODO: Set display select2
         */
        const toggleSelect2 = (id) => {
            console.log("set-select2", id);
            hideSelect2Dropdown(id);
            let selector = document.getElementById("select__box_" + id);
            if (id != null) {
                selector.classList.toggle("d-none");
            }
        }

        const hideSelect2Dropdown = (id) => {
            console.log('hideSelect2Dropdown')
            let selected2Selectors = document.getElementsByClassName("select2__items");
            for (let i = 0; i < selected2Selectors.length; i++) {
                if (id != i) {
                    const element = selected2Selectors[i];
                    element.classList.add("d-none");
                }
            }
        }

        return {
            fieldValue,
            fieldName,
            messageRequired,

            toggleSelect2,
            autoSearching,
            setSelectedItem,
            displayAmountCharacters
        };
    }
}
</script>
<style lang="">
    
</style>