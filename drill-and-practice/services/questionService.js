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

const retrieveQuestionById = async (questionId) => {
    const result = await executeQuery(
        "SELECT * FROM questions WHERE id = $id",
        { id: questionId }
    );

    return result.rows[0];
};

const deleteQuestionById = async (questionId) => {
    await executeQuery(
        "DELETE FROM questions WHERE id = $qId",
        { qId: questionId},
    );
};

const returnRandomQuestion = async () => {
    const result = await executeQuery(
        `SELECT * FROM questions
            ORDER BY RANDOM()
            LIMIT 1`,
    );
    
    return result.rows[0];
};

export { listAllQuestionsForTopic, addQuestionToTopic, retrieveQuestionById, deleteQuestionById, returnRandomQuestion };