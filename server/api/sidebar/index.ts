import { sidebarItems } from "~~/server/db/SidebarItems";

export default defineEventHandler(async(e) => {
    if (e.req.method === "GET") {
        return sidebarItems.items;
    }
})
