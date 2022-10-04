import api from "~~/services/api";
import CONFIG from "~~/config";

class TopicService {
    getAll() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/topics`)
    }

    getById(topicId) {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/topic/${topicId}`);
    }

    saveOrUpdate(topic) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/topic`, topic);
    }

    deleteById(topicId) {
        return api.delete(`${CONFIG.NEWS_GATEWAY}/api/topic/${topicId}`);
    }
}

export default new TopicService();
