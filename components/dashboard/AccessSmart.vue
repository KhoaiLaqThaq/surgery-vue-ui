<template>
    <div class="row">
        <div class="col-12 mb-3">
            <div class="title fw-bold text-lg">{{ $t('label.action.fast') }}</div>
        </div>
        <!-- add-session -->
        <div class="col-md-3 col-xs-12 access-smart mb-3">
            <div class="box border-2px d-flex px-3 py-4 zoom-in-little" @click="addSession()">
                <!-- <PostIcon class="w-8 h-8 text-primary hidden-xs" /> -->
                <font-awesome-icon icon="fa-solid fa-notes-medical" size="2x" class="text-theme" />
                <div class="alignment-center ms-3 fw-bold">{{ $t('label.action.newSession') }}</div>
            </div>
        </div>
        <!-- /add-session -->

        <!-- add-prescription -->
        <div class="col-md-3 col-xs-12 access-smart mb-3">
            <div class="box border-2px d-flex px-3 py-4 zoom-in-little">
                <!-- <IconTopic class="w-8 h-8 text-primary hidden-xs" /> -->
                <font-awesome-icon icon="fa-solid fa-id-card-clip" size="2x" class="text-theme" />
                <div class="alignment-center ms-3 fw-bold">{{ $t('label.action.newPrescription') }}</div>
            </div>
        </div>
        <!-- /add-prescription -->

        <!-- material-batch -->
        <div class="col-md-3 col-xs-12 access-smart mb-3">
            <div class="box border-2px d-flex px-3 py-4 zoom-in-little" @click="addMateiralBatch()">
                <!-- <IconTopic class="w-8 h-8 text-primary hidden-xs" /> -->
                <font-awesome-icon icon="fa-solid fa-kit-medical" size="2x" class="text-theme" />
                <div class="alignment-center ms-3 fw-bold">{{ $t('label.action.newMaterialBatch') }}</div>
            </div>
        </div>
        <!-- /material-batch -->

        <!-- material -->
        <div class="col-md-3 col-xs-12 access-smart mb-3">
            <div class="box border-2px d-flex px-3 py-4 zoom-in-little" @click="addMaterial()">
                <!-- <IconTopic class="w-8 h-8 text-primary hidden-xs" /> -->
                <font-awesome-icon icon="fa-solid fa-pills" size="2x" class="text-theme" />
                <div class="alignment-center ms-3 fw-bold">{{ $t('label.action.newMaterial') }}</div>
            </div>
        </div>
        <!-- /material -->
    </div>
</template>
<script setup>
import IconTopic from "~~/assets/images/icons/IconTopic.vue";
import PostIcon from "~~/assets/images/icons/PostIcon.vue";

const addSession = () => navigateTo('/session/form');
const addMateiralBatch = () => navigateTo('/common/materialBatch/form');
const addMaterial = () => navigateTo('/common/material/form');
</script>
<style>

</style>
