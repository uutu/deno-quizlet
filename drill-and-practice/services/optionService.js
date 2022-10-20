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

export { addOptionById, listAllOptionsForQuestion };