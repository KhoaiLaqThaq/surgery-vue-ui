import api from "~~/services/api";
import CONFIG from "~~/config";

class UserDepartService {

    search(criteria) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/userDepartments`, criteria);
    }

    getById(k6kUserId) {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/userDepartment/${k6kUserId}`);
    }

    getByUserId(K6kUserId){
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/userDepartment/${K6kUserId}`)
    }

    saveOrUpdate(newsDepartmentData, headers) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/userDepartment`, newsDepartmentData, {headers});
    }

    update(departmentId, userDepartment) {
        return api.put(`${CONFIG.NEWS_GATEWAY}/api/userDepartment/${departmentId}`, userDepartment);
    }

    deleteById(k6kUserId){
        return api.delete(`${CONFIG.NEWS_GATEWAY}/api/userDepartment/delete/${k6kUserId}`);
    }
}

export default new UserDepartService();
