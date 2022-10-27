import { executeQuery } from "../database/database.js";

const retrieveRandomQuestion = async (topicId) => {
    const result = await executeQuery(
        `SELECT * FROM questions WHERE topic_id = $id
            ORDER BY RANDOM()
            LIMIT 1`,
        { id: topicId }
    );
    
    return result.rows[0];
};

const retrieveQuestionById = async (questionId) => {
    const result = await executeQuery(
        `SELECT * FROM questions
            WHERE id = $questionId`,
            { questionId: questionId }
    );

    return result.rows[0];
};

const retrieveOptionsForQuestion = async (questionId) => {
    const result = await executeQuery(
        `SELECT * FROM question_answer_options
            WHERE question_id = $questionId`,
            { questionId: questionId }
    );

    return result.rows;
};

const storeAnswerForUser = async (userId, questionId, optionId) => {
    await executeQuery(
        `INSERT INTO question_answers (user_id, question_id, question_answer_option_id)
            VALUES ($userId, $questionId, $optionId)`,
            { userId: userId, questionId: questionId, optionId: optionId }
    );
};

export { retrieveRandomQuestion, retrieveQuestionById, retrieveOptionsForQuestion, storeAnswerForUser };