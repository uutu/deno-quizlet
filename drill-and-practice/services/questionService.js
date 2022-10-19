import { executeQuery } from "../database/database.js";

const listAllQuestionsForTopic = async (id) => {
    const result = await executeQuery(
        "SELECT * FROM questions WHERE topic_id = $id",
        { id: id }
    );

    return result.rows;
};

export { listAllQuestionsForTopic };