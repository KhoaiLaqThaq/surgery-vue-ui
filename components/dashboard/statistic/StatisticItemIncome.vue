<template>
  <div class="col-lg-3 col-md-6 col-xs-12">
    <div class="statistic-item two box zoom-in-little ps-2 py-3">
      <div class="statistic__icon ps-2 pb-3 d-flex">
        <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" size="2x" class="text-success" />
        <div class="statistic__title ps-3 text-secondary">{{ $t('label.statistic.income') }}</div>
      </div>
      <div class="statistic__data ps-2">
        <div class="statistic__value fw-bold">
          <font-awesome-icon icon="fa-solid fa-dollar-sign" />
          <span class="text-lg ps-1">{{ $n(statistic.totalRevenue) }}</span>
        </div>
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
