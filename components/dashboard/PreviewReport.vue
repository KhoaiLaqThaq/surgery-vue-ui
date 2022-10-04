<template>
    <div class="d-grid grid-cols-12 grap-6 mt-3">
        <div class="report-box zoom-in">
            <div class="box p-3 bgc-template text-white">
                <div class="d-flex">
                    <ComputerIcon />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{reports.viewTotal}}</div>
                <div class="text-base text-slate-500 mt-1">Lượt xem tin tức</div>
            </div>
        </div>

        <div class="report-box zoom-in">
            <div class="box p-3 bg-success text-white">
                <div class="d-flex">
                    <PostIcon />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{reports.newsTotal}}</div>
                <div class="text-base text-slate-500 mt-1">Số lượng bài viết</div>
            </div>
        </div>

        <div class="report-box zoom-in">
            <div class="box p-3  bg-warning text-white">
                <div class="d-flex">
                    <UserChartIcon />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{reports.userTotal}}</div>
                <div class="text-base text-slate-500 mt-1">SL tài khoản kích hoạt</div>
            </div>
        </div>

        <div class="report-box zoom-in">
            <div class="box p-3  bg-secondary text-white">
                <div class="d-flex text-left">
                    <UserInactiveIcon />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{reports.userInactiveTotal}}</div>
                <div class="text-base text-slate-500 mt-1">SL tài khoản chưa được kích hoạt</div>
            </div>
        </div>
    </div>
</template>
<script>
import {reactive} from 'vue';
import ComputerIcon from '~~/assets/images/icons/ComputerIcon.vue';
import PostIcon from '~~/assets/images/icons/PostIcon.vue';
import UserIcon from '~~/assets/images/icons/UserIcon.vue';
import UserInactiveIcon from '~~/assets/images/icons/charts/UserInactiveIcon.vue';
import UserChartIcon from '~~/assets/images/icons/charts/UserChartIcon.vue';
import IconCommunity from '~~/assets/images/icons/IconCommunity.vue';
import DashboardService from "~~/services/model/dashboard.service";

export default {
    components: {
        ComputerIcon, PostIcon, UserIcon, IconCommunity, UserInactiveIcon, UserChartIcon, 
        UserChartIcon
    },
    setup() {
        const { $showToast } = useNuxtApp();
        const reports = reactive({
            userTotal: 0,
            viewTotal: 0,
            newsTotal: 0,
            userInactiveTotal: 0
        });

        function setData(reportData) {
            reports.userTotal = reportData.userTotal;
            reports.viewTotal = reportData.viewTotal;
            reports.newsTotal = reportData.newsTotal;
            reports.userInactiveTotal = reportData.userInactiveTotal;
        };

        // TODO: this api will be get statistic common
        function searchCallApi() {
            DashboardService.showReportPreview().then((response) => {
                const responseData = response.data;
                if (responseData) setData(responseData);
            })
            .catch((e) => {
                $showToast("Tải thống kê chung không thành công!", "error", 2000);
                console.log(e);
            });
        }

        return {
            reports,
            searchCallApi
        }
    },
    created() {
        this.searchCallApi();
    },
}
</script>
<style lang="">
    
</style>