import api from "~~/services/api";
import CONFIG from "~~/config";

class SystemParamService {
    search(criteria) {
        return api.post(`${CONFIG.PREFIX_API}/systemParam/search`, criteria);
    }

    getById(systemParamId) {
        return api.get(`${CONFIG.PREFIX_API}/systemParam/${systemParamId}`);
    }

    saveOrUpdate(data) {
        return api.post(`${CONFIG.PREFIX_API}/systemParam`, data);
    }
}

export default new SystemParamService();
