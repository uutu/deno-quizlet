import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const returnRandomQuestion = async ({ response }) => {
    const question = await questionService.returnRandomQuestion();

    if (question) {
        const options = await optionService.listAllOptionsForQuestion(question.id);

        const randomQuestionObject = {
            "questionId": question.id,
            "questionText": question.question_text,
            "answerOptions": [],
        };

        for (let i = 0; i < options.length; i++) {
            randomQuestionObject.answerOptions.push({"optionId": options[i].id, "optionText": options[i].option_text});
        };
        
        response.body = randomQuestionObject;

    } else {
        response.body = {};
    }
};

export { returnRandomQuestion };