import api from "~~/services/api";
import CONFIG from "~~/config";

class CommentService {
    search(criteria) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/comments`, criteria);
    } 

    deleteById(commentId) {
        return api.delete(`${CONFIG.NEWS_GATEWAY}/api/comment/${commentId}`);
    }

    changeCommentStatus(commentId) {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/comment/enable/${commentId}`);
    }

    changeMultiCommentStatus(comment) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/comments/enableAll`, comment);
    }
}

export default new CommentService();
