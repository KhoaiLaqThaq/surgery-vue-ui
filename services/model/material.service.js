import api from "~~/services/api";
import CONFIG from "~~/config";

class MaterialService {

    getAll() {
        return api.get(`${CONFIG.PREFIX_API}/material/list`);
    }

    getById(id) {
        return api.get(`${CONFIG.PREFIX_API}/material/${id}`);
    }

    search(criteria) {
        return api.post(`${CONFIG.PREFIX_API}/material/search`, criteria);
    }

    saveOrUpdate(material) {
        return api.post(`${CONFIG.PREFIX_API}/material`, material);
    }
}

export default new MaterialService();
