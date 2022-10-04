import api from "~~/services/api";
import CONFIG from "~~/config";

class PatientService {
    search(criteria) {
        return api.post(`${CONFIG.PREFIX_API}/patient/search`, criteria);
    }
}

export default new PatientService();
