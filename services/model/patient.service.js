import api from "~~/services/api";
import CONFIG from "~~/config";

class PatientService {
    getById(id) {
        return api.get(`${CONFIG.PREFIX_API}/patient/${id}`);
    }

    search(criteria) {
        return api.post(`${CONFIG.PREFIX_API}/patient/search`, criteria);
    }

    getPatientInfoByPatientId(patientId) {
        return api.get(`${CONFIG.PREFIX_API}/patientInfo/${patientId}`);
    }
}

export default new PatientService();
