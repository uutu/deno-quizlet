import { executeQuery } from "../database/database.js";


const addOptionById = async (question_id, option_text, is_correct) => {
    await executeQuery(
        "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($id, $text, $isCorrect)",
        { id: question_id, text: option_text, isCorrect: is_correct },
    );
};

const listAllOptionsForQuestion = async (id) => {
    const result = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $id",
        { id, id },
    );

    return result.rows;
};

const deleteOptionAndAnswersCascade = async (oId) => {
    await executeQuery(
        "DELETE FROM question_answer_options WHERE id = $oId",
        { oId: oId },
    );

    await executeQuery(
        "DELETE FROM question_answers WHERE question_answer_option_id = $oId",
        { oId: oId },
    );
};

const checkForCorrectness = async (optionId) => {
    const result = await executeQuery(
        `SELECT * FROM question_answer_options
            WHERE id = $optionId`,
            { optionId: optionId }
    );
    return result.rows[0];
};

const retrieveCorrectOptions = async (questionId) => {
    const result = await executeQuery(
        `SELECT * FROM question_answer_options
        WHERE question_id = $questionId 
            AND is_correct = $true`,
            { questionId: questionId, true: true}
    );

    return result.rows;
};

export { addOptionById, listAllOptionsForQuestion, deleteOptionAndAnswersCascade, checkForCorrectness, retrieveCorrectOptions };