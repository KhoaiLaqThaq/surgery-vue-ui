import api from "~~/services/api";
import CONFIG from "~~/config";

class DashboardService {
    showReportPreview() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/report/preview`);
    }

    getNewsStatisticByTopic() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/statistic/newsByTopic`);
    }

    getUsersStatisticByDepartment() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/statistic/usersByDepartment`);
    }
}

export default new DashboardService();
