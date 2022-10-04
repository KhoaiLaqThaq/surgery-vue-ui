<template>
    <div class="preview-container">
        <div class="dropdown">
            <button class="btn dropdown-toggle after-content-none btn-light box ms-auto d-flex items-center" data-toggle="dropdown"
                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                :type="btnType"
            >
                <PreviewIcon class="lucide w-4 h-4" />
                <span class="ms-2" :class="textSize">{{ name }}</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#newsPreview"
                ><IconPhone /> <span>Phone preview </span></li>
                <li class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#newsTabletPreview"
                ><IconTablet /> <span>Tablet preview </span></li>
            </ul>
        </div>
    </div>
</template>
<script>
import PreviewIcon from '~~/assets/images/icons/PreviewIcon.vue';
import IconPhone from '~~/assets/images/icons/IconPhone.vue';
import IconTablet from '~~/assets/images/icons/IconTablet.vue'

export default {
    components: {
        PreviewIcon,
        IconPhone,
        IconTablet
    },
    props: [
        'btnType',
        'name',
        'textSize'
    ]
}
</script>
<style lang="scss">
    .btn {
        display: inline-flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        border-width: 1px;
        padding: 0.5rem 0.75rem;
        font-weight: 500;
    }
</style>