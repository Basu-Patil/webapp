import { createUser, getUser, updateUser } from "../services/userService.js";

const responseHeaders = {
    "Cache-Control": "no-cache",
    "Date": new Date().toGMTString(),
    "Content-Type": "application/json"
}

export const createUserController = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.header(responseHeaders);
        return res.status(201)
                  .json(user)
                  .send();
    } catch (error) {
        return res.status(400)
                    .send();
    }   
}

export const getUserController = async (req, res) => {
    try {
        const user = await getUser(req.user);
        res.header(responseHeaders);
        return res.status(200)
                  .json(user)
                  .send();
    } catch (error) {
        return res.status(400)
                    .send();
    }
}

export const updateUserController = async (req, res) => {
    try {
        await updateUser(req.user, req.body);
        res.header(responseHeaders);
        return res.status(204)
                  .send();
    } catch (error) {
        return res.status(400)
                    .send();
    }
}