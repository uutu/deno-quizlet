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

const checkAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const object = JSON.stringify(body);

    const correctOptions = await optionService.retrieveCorrectOptions(object.questionId);

    for (let i = 0; i < correctOptions.length; i++) {
        if (correctOptions[i].id === object.optionId) {
            response.body = {"correct":"true"};
            break;
        }
    };

    response.body = {"correct":"false"};  
};

export { returnRandomQuestion, checkAnswer };