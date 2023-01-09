<template>
  <div class="mt-3">
    <div class="row">
      <div class="col-md-9">
        <!-- truy cap nhanh -->
        <access-smart></access-smart>
        <!-- /truy cap nhanh -->
        <hr class="hr"/>

        <!-- bao cao/thong ke nhanh -->
        <statistic></statistic>
        <!-- /bao cao/thong ke nhanh -->
      </div>

      <div class="col-md-3 border-x">
        <session-report></session-report>
      </div>
    </div>

    
  </div>
</template>
<script>
import AccessSmart from '~~/components/dashboard/AccessSmart.vue';
import SessionReport from '~~/components/dashboard/SessionReport.vue';
import Statistic from '~~/components/dashboard/statistic';

export default {
    components: { 
      AccessSmart,
      SessionReport,
      Statistic
     },
    setup() {
      return {
        
      }
    }
};
</script>
<style lang=""></style>
