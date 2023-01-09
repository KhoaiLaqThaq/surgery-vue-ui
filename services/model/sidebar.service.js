import axios from "axios";

class SidebarService {
    getInitData() {
        return axios.get("/api/sidebar")
    }
}

export default new SidebarService();
