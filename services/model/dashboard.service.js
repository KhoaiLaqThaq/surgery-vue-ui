import api from "~~/services/api";
import CONFIG from "~~/config";

class DashboardService {
    getStatistic(request) { 
        return api.post(`${CONFIG.PREFIX_API}/statistic/dashboard`, request);
    }
}

export default new DashboardService();
