import api from "~~/services/api";
import CONFIG from "~~/config";

class PrescriptionService {
    getByPatientId(patientId) {
        
    }

    getAllBySessionId(sessionId) {
        return api.get(`${CONFIG.PREFIX_API}/prescription/session/${sessionId}`);
    }
}

export default new PrescriptionService();
