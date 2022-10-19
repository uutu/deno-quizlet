import { executeQuery } from "../database/database.js";

const listAllQuestionsForTopic = async (id) => {
    const result = await executeQuery(
        "SELECT * FROM questions WHERE topic_id = $id",
        { id: id }
    );

    return result.rows;
};

const addQuestionToTopic = async (question, topicId, userId) => {
    await executeQuery(
        "INSERT INTO questions (question_text, topic_id, user_id) VALUES ($question, $topic, $user)",
        { question: question, topic: topicId, user: userId },
    );
};

export { listAllQuestionsForTopic, addQuestionToTopic };