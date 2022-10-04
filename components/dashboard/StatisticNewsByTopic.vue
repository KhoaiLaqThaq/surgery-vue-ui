<template>
    <div class="w100">
        <TabsWrapper>
          <TabItem title="Đồ thị">
            <div class="card radius-unset box">
              <div class="card-body">
                <PieChart :chartId="'pie-chart'" :width="400"  :height="400"
                    :chartData="chartData"
                />
              </div>
            </div>
          </TabItem>
          <TabItem title="Bảng">
            <div class="form-group bg-white">
              <div class="card m-3 border-none">
                <div class="card-body p-0">
                    <TableNewsStatisticComponent :items="items" :page="page" :size="size" />
                </div>
              </div>
            </div>
          </TabItem>
        </TabsWrapper>
    </div>
</template>
<script>
import {ref} from 'vue';

import TabsWrapper from "~~/components/common/tab/TabsWrapper.vue";
import TabItem from "~~/components/common/tab/TabItem.vue";
import PieChart from '~~/components/dashboard/PieChart';
import DashboardService from '~~/services/model/dashboard.service';
import TableNewsStatisticComponent from '~~/components/common/table/TableNewsStatisticComponent.vue';
import { colorChartPie } from "~~/constants/enum";

export default {
    components: { 
        TableNewsStatisticComponent, 
        PieChart,
        TabsWrapper,
        TabItem
    },
    setup() {
        const { $showToast } = useNuxtApp();
        const items = ref([]);
        const page = ref(0);
        const size = ref(10);
        const labels = ref([]);
        const chartValue = ref([]);
        const chartBackgroundColor = ref([]);
        const chartData = ref({});

        function randomBackgroundColorChart(num) {
            if (num > 0) {
                for (var i = 0; i < num; i++) {
                    chartBackgroundColor.value.push(colorChartPie[i].color)
                }
            }
        }

        function onLoadNewsStatisticByTopic() {
            DashboardService.getNewsStatisticByTopic().then((response) => {
                let responseData = response.data;
                if (responseData) {
                    items.value = responseData;
                    for (let i = 0; i < responseData.length; i++) {
                        let item = responseData[i];
                        labels.value.push(item.topicName);
                        chartValue.value.push(item.amountNewsByTopic);
                    }

                    randomBackgroundColorChart(responseData.length);
                    // TODO: set data for chart views
                    chartData.value = {
                        "labels": labels.value,
                        "datasets": [
                            {
                                "backgroundColor": chartBackgroundColor.value,
                                "data": chartValue.value
                            }
                        ]
                    }
                }
            }).catch((error) => {
                $showToast("Error: Lấy dữ liệu thống kê tin tức theo chuyên mục không thành công", "error", 2000);
                console.log("Failed to get news statistic by topic: ", error);
            })
        }

        return {
            items, page, size,
            chartData,

            onLoadNewsStatisticByTopic
        }
    },
    mounted() {
        this.onLoadNewsStatisticByTopic();
    }
}
</script>
<style lang="">
    
</style>