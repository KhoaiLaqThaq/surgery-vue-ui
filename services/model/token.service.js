class TokenService {
    getLocalAccessToken() {
        const accessToken = localStorage.getItem('token');
        return accessToken;
    }

    setLocalAccessToken(accessToken) {
        localStorage.setItem('token', accessToken);
    }

    logout() {
        localStorage.clear();
    }
}

export default new TokenService();
