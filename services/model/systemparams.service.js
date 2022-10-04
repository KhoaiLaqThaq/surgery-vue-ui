import api from "~~/services/api";
import CONFIG from "~~/config";

class SystemParamsService {
    getAll() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/systemParameters/`);
    }

    saveOrUpdate(systemParams) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/systemParameter`, systemParams);
    }

    deleteById(id) {
        return api.delete(`${CONFIG.NEWS_GATEWAY}/api/systemParameter/${id}`);
    }
}

export default new SystemParamsService();
