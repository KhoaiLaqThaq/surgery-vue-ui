<template>
  <div class="item-content">
    <h2 class="text-lg font-medium text-yl">{{ title }}</h2>
  </div>
</template>
<script>
export default {
  props: ["title"],
  setup(props) {
    return {
      title: props.title,
    };
  },
};
</script>
<style lang=""></style>
