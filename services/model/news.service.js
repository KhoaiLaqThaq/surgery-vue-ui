import api from "~~/services/api";
import CONFIG from "~~/config";

class NewsService {

    search(criteria) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/news/list`, criteria);
    }

    getById(newsId) {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/news/${newsId}`);
    }

    getAllTags() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/tags`);
    }

    getAllNewsType() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/newsTypes`);
    }

    getAllTopic() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/topics`);
    }

    getAllDepartment() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/departments`);
    }

    saveOrUpdate(news, headers) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/news`, news, {headers});
    }
}

export default new NewsService();
