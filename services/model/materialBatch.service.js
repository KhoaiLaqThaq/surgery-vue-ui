import api from "~~/services/api";
import CONFIG from "~~/config";

class MaterialBatchService {

    getAll() {
        return api.get(`${CONFIG.PREFIX_API}/materialBatch/list`);
    }

    getById(id) {
        return api.get(`${CONFIG.PREFIX_API}/materialBatch/${id}`);
    }

    search(criteria) {
        return api.post(`${CONFIG.PREFIX_API}/materialBatch/search`, criteria);
    }

    saveOrUpdate(materialBatch) {
        return api.post(`${CONFIG.PREFIX_API}/materialBatch`, material);
    }
}

export default new MaterialBatchService();
