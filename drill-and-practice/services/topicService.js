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

const addNewTopic = async (userId, name) => {
    await executeQuery(
        "INSERT INTO topics (user_id, name) VALUES ($userId, $name)",
        { userId: userId.id, name: name }
    );
};

const deleteTopicByIdCascade = async (id) => {
    // TODO
};

export { listAvailableTopics, retrieveTopicById, addNewTopic, deleteTopicByIdCascade };