<template>
  <div class="row">
    <div class="col-12 mb-3 d-inline">
      <div class="title fw-bold text-lg d-inline">{{ $t('label.statistic.text') }}</div>
      <statistic-filter class="float-end" @listenerChangeFilter="changeStatisticFilter($event)"></statistic-filter>
    </div>
  </div>
  <div class="row statistic">
    <statistic-item-import-money :statistic="statistic" class="mb-3"></statistic-item-import-money>
    <statistic-item-income :statistic="statistic" class="mb-3"></statistic-item-income>
    <statistic-item-session :statistic="statistic" class="mb-3"></statistic-item-session>
    <statistic-item-patient :statistic="statistic" class="mb-3"></statistic-item-patient>
  </div>
</template>
<script>

import StatisticFilter from '~~/components/dashboard/statistic/StatisticFilter.vue';
import StatisticItemImportMoney from '~~/components/dashboard/statistic/StatisticItemImportMoney.vue';
import StatisticItemIncome from '~~/components/dashboard/statistic/StatisticItemIncome.vue';
import StatisticItemSession from '~~/components/dashboard/statistic/StatisticItemSession.vue';
import StatisticItemPatient from '~~/components/dashboard/statistic/StatisticItemPatient.vue';

import DashboardService from '~~/services/model/dashboard.service';

export default {
  components: {
    StatisticFilter, StatisticItemImportMoney, StatisticItemIncome, StatisticItemSession, StatisticItemPatient
  },
  setup() {
    const statistic = reactive({
      totalPatient: 0,
      totalReceive: 0,
      totalRevenue: 0,
      totalSession: 0
    });
    const setStatistic = (data) => {
      statistic.totalReceive = data.totalReceive;
      statistic.totalRevenue = data.totalRevenue;
      statistic.totalSession = data.totalSession;
      statistic.totalPatient = data.totalPatient;
    }

    const changeStatisticFilter = (e) => searchStatistic({ range: e })
    
    function searchStatistic(range) {
      DashboardService.getStatistic(range)
        .then(response => {
          let data = response.data;
          if (data) {
            setStatistic(data);
          }
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    }

    return {
      statistic,

      searchStatistic,
      changeStatisticFilter
    }
  },
  beforeCreate() {
    this.searchStatistic({})
  }
}
</script>
<style lang="scss">
.statistic {
  .statistic-item {
    border-left: 4px solid #FFF;
    &.first:hover {
      border-left: 4px solid #1e40af;
    }
    &.two:hover {
      border-left: 4px solid #198754;
    }
    &.three:hover {
      border-left: 4px solid #dc3545;
    }

    &.four:hover {
      border-left: 4px solid #ffc107;
    }

    .statistic__value {
      span {
        font-size: 15px;
      }
    }
  }
}
</style>