import api from "~~/services/api";
import TokenService from "~~/services/model/token.service";

class AuthService {
    login(data) {
        return api.post(`auth/signIn`, data);
    }

    logout() {
        TokenService.logout();
    }
}

export default new AuthService();
