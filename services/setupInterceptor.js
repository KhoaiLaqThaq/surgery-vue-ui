import instance from "~~/services/api";
import TokenService from "~~/services/model/token.service";

const setup = () => {
    instance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = "Bearer " + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            // const originalConfig = error.config;
            if (err.response) {
                // Access token was expired, then login again
                if (err.response.status === 401) {
                    TokenService.logout();
                    location.reload();
                }
            }

            return Promise.reject(err);
        }
    )
}

export default setup;
