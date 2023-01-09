<template>
  <div class="col-6">
    <Datepicker v-model="date" @update:model-value="onChangeFilter" range multi-calendars close-on-scroll></Datepicker>
  </div>
</template>
<script>
import Datepicker from '@vuepic/vue-datepicker';
import { ref, onMounted } from 'vue';

export default {
  components: {
    Datepicker
  },
  setup(props, { emit }) {
    const date = ref(null);

    onMounted(() => {
      const startDate = new Date()
      const endDate = new Date()
      date.value = [startDate, endDate]
    })

    function onChangeFilter(modelData) {
      emit('listenerChangeFilter', modelData);
    }

    return {
      date,
      onChangeFilter
    }
  }
}
</script>
<style lang="">
    
</style>