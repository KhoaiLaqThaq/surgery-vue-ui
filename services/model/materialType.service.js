import api from "~~/services/api";
import CONFIG from "~~/config";

class MaterialTypeService {

    getAll() {
        return api.get(`${CONFIG.PREFIX_API}/materialType/list`);
    }

    getById(id) {
        return api.get(`${CONFIG.PREFIX_API}/materialType/${id}`);
    }

    saveOrUpdate(material) {
        return api.post(`${CONFIG.PREFIX_API}/materialType`, material);
    }
}

export default new MaterialTypeService();
