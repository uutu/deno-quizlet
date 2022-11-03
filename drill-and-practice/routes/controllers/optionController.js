import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

import { validasaur } from "../../deps.js";

const optionValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const urlParts = request.url.pathname.split("/");

    return {
        name: params.get("option_text"),
        isCorrect: params.get("is_correct"),
        currentQuestion: await questionService.retrieveQuestionById(urlParts[4]),
        availableOptions: await optionService.listAllOptionsForQuestion(urlParts[4]),
    };
};

const addOptionToQuestion = async ({ request, response, render }) => {

    const optionData = await getOptionData(request);

    const [passes, errors] = await validasaur.validate(
        optionData,
        optionValidationRules,
    );

    if (!passes) {
        console.log(errors);
        optionData.validationErrors = errors;
        render("questionPage.eta", optionData);
    } else {

        if (optionData.isCorrect === "on") {
            await optionService.addOptionById(optionData.currentQuestion.id, optionData.name, true); 
        } else {
            await optionService.addOptionById(optionData.currentQuestion.id, optionData.name, false);
        }

        console.log("Input okay: redirecting");
        response.redirect(`/topics/${optionData.currentQuestion.topic_id}/questions/${optionData.currentQuestion.id}`);
    }  
};

const deleteOptionById = async ({ params, response }) => {

    // Call service responsible for answer options with the parametre
    await optionService.deleteOptionAndAnswersCascade(params.oId);
    
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`); 
};

export { addOptionToQuestion, deleteOptionById };