import api from "~~/services/api";
import CONFIG from "~~/config";

class SessionService {
    getAllByPatientId(patientId) {
        return api.get(`${CONFIG.PREFIX_API}/session/patient/${patientId}`);
    }

    getById(sessionId) {
        return api.get(`${CONFIG.PREFIX_API}/session/${sessionId}`);
    }

    getAll() {
        return api.get(`${CONFIG.PREFIX_API}/session/list`);
    }

    search(criteria) {
        return api.post(`${CONFIG.PREFIX_API}/session/search`, criteria);
    }

}

export default new SessionService();
