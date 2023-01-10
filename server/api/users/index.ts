import { db } from "~~/server/db";
import { v4 as uuid } from "uuid";
import { sendError } from "h3"

export default defineEventHandler(async (e) => {
    if (e.req.method === "GET") {
        return db.users;
    }

    if (e.req.method === "POST") {
        const body = await useBody(e);
        if (!body.username) {
            const badRequestErr = createError({
                statusCode: 400,
                statusMessage: "Username property not found"
            });

            sendError(e, badRequestErr);
        }

        const newUser = {
            id: uuid(),
            item: body.username,
            online: true
        };

        db.users.push(newUser);
        return newUser;
    }
});
