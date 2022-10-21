import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
    await executeQuery(
        `INSERT INTO users
        (email, password)
        VALUES ($email, $password)`,
        { email: email, password: password }
    );
};

export { addUser };