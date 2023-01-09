<template>
  <div class="col-lg-3 col-md-6 col-xs-12">
    <div class="statistic-item three box zoom-in-little ps-2 py-3">
      <div class="statistic__icon ps-2 pb-3 d-flex">
        <font-awesome-icon icon="fa-solid fa-hospital-user" size="2x" class="text-danger" />
        <div class="statistic__title ps-3 text-secondary">{{ $t('label.statistic.session') }}</div>
      </div>
      <div class="statistic__data ps-2">
        <div class="statistic__value fw-bold text-lg">{{ $n(statistic.totalSession) }}</div>
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
