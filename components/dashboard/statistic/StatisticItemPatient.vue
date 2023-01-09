<template>
  <div class="col-lg-3 col-md-6 col-xs-12">
    <div class="statistic-item four box zoom-in-little ps-2 py-3">
      <div class="statistic__icon ps-2 pb-3 d-flex">
        <font-awesome-icon icon="fa-solid fa-bed-pulse" size="2x" class="text-warning" />
        <div class="statistic__title ps-3 text-secondary">{{ $t('label.statistic.patient') }}</div>
      </div>
      <div class="statistic__data ps-2">
        <div class="statistic__value fw-bold text-lg">{{ $n(statistic.totalPatient) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    statistic: {
      type: Object,
      required: true
    }
  }
}
</script>
