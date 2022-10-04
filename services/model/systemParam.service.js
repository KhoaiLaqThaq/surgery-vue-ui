import api from "~~/services/api";
import CONFIG from "~~/config";

class SystemParamService {
    search(criteria) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/systemParameter/search`, criteria);
    }

    getById(systemParamId) {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/systemParameter/${systemParamId}`);
    }

    saveOrUpdate(data) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/systemParameter`, data);
    }
}

export default new SystemParamService();
