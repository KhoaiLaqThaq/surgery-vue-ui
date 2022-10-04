import api from "~~/services/api";
import CONFIG from "~~/config";

class GroupService {

    getById(id) {
        return api.get(`${CONFIG.USER_GATEWAY}/api/group/${id}`);
    }

    saveOrUpdate(group) {
        return api.post(`${CONFIG.USER_GATEWAY}/api/group`, group);
    }

    getAllRoles() {
        return api.get(`${CONFIG.USER_GATEWAY}/api/roles`);
    }
    
}

export default new GroupService();
