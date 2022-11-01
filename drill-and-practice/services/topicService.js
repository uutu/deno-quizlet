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

    await executeQuery(
        `DELETE FROM question_answers
            WHERE question_id IN (SELECT id FROM questions
                        WHERE questions.topic_id = $id)`,
                        { id: id }
    );

    await executeQuery(
        `DELETE FROM question_answer_options
            WHERE question_id IN (SELECT id FROM questions
                        WHERE questions.topic_id = $id)`,
                        { id: id }
    );

    await executeQuery(
        `DELETE FROM questions WHERE questions.topic_id = $id`,
        { id: id }
    );


    await executeQuery(
        `DELETE FROM topics WHERE id = $id`,
        { id: id }
    );
};

export { listAvailableTopics, retrieveTopicById, addNewTopic, deleteTopicByIdCascade };