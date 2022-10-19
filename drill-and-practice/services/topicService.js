import { executeQuery } from "../database/database.js";

const listAvailableTopics = async () => {
    const res = await executeQuery(
        "SELECT * FROM topics ORDER BY name ASC"
    );
    return res.rows;
};

const retrieveTopicById = async (id) => {
    const res = await executeQuery(
        "SELECT * FROM topics WHERE id = $id",
        { id: id }
    );
    return res.rows[0];
};

export { listAvailableTopics, retrieveTopicById };