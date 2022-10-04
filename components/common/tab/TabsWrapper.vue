<script setup>
import { useSlots, ref , provide} from 'vue'

const slots = useSlots()
const tabTitles = ref(slots.default().map(tab => tab.props.title))
const selectedTitle = ref(tabTitles.value[0])

provide('selectedTitle', selectedTitle)
</script>

<template>
    <div class="tabs">
        <ul class="tabs__header bg-slate-200">
            <li 
                v-for="title in tabTitles" 
                :key="title"
                class="tabs__item"
                :class="{ selected: selectedTitle === title}"
                @click="selectedTitle = title"
            >
                {{ title }}
            </li>
        </ul>

        <slot />
    </div>
</template>

<style lang="scss">
.tabs__header {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 5px;
    width: 100%;
    &.bg-slate-200 {
        --tw-bg-opacity: 1;
    background-color: rgb(226,232,240);
    }
}

.tabs__item {
    flex: 1;
    background-color: rgb(226,232,240);
    padding: 0.75rem 10px;
    // border-radius: 5px 5px 0 0;
    transition: .4s all ease-out;
    cursor: pointer;
    user-select: none;
    // max-width: 150px;
}

.tabs__item.selected {
    background-color: #FFFFFF;
    color: #1e40af;
    font-weight: 600;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.tabs__content {
    background-color: #bfbfbf;
    min-height: 300px;
    display: grid;
    border-radius: unset;
}
</style>