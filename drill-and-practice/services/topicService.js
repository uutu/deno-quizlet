import { executeQuery } from "../database/database.js";

const listAvailableTopics = async () => {
    const res = await executeQuery(
        "SELECT * FROM topics ORDER BY name ASC"
    );
    return res.rows;
};

export { listAvailableTopics };