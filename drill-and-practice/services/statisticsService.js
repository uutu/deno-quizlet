import { executeQuery } from "../database/database.js";

const returnServiceStatistics = async() => {
    const topics = await executeQuery(
        "SELECT COUNT(*) FROM topics;"
    );

    const questions = await executeQuery(
        "SELECT COUNT(*) FROM questions;"
    );

    const answers = await executeQuery(
        "SELECT COUNT(*) FROM question_answers;"
    );

    const result = {
        topics: topics.rows[0],
        questions: questions.rows[0],
        answers: answers.rows[0],
    };

    return result;

};

export { returnServiceStatistics };