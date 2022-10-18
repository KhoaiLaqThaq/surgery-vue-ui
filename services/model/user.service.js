import api from "~~/services/api";
import CONFIG from "~~/config";

class UserService {

    search(criteria) {
        return api.post(`${CONFIG.PREFIX_API}/user/search`, criteria);
    }

    getById(userId) {
        return api.get(`${CONFIG.PREFIX_API}/user/${userId}`);
    }

    saveOrUpdate(user) {
        return api.post(`${CONFIG.PREFIX_API}/signUp`, user);
    }

    deleteById(k6kUserId){
        return api.delete(`${CONFIG.PREFIX_API}/userDepartment/delete/${k6kUserId}`);
    }
}

export default new UserService();
