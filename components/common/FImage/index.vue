<template>
  <nuxt-img :src="srcImage" 
    :alt="altForImage" 
    :height="height ?? size"
    :width="width ?? size"
    format="svg"
  />
</template>
<script setup>
const props = defineProps({
  srcImage: {
    type: String,
    required: true
  },
  altForImage: {
    type: String,
    required: false
  },
  size: {
    type: Number,
    required: false
  },
  height: {
    type: Number,
    required: false
  },
  width: {
    type: Number,
    required: false
  }
});

</script>
