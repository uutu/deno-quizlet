import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const urlParts = request.url.pathname.split("/");

    return {
        name: params.get("question_text"),
        currentTopic: await topicService.retrieveTopicById(urlParts[2]),
        availableQuestions: await questionService.listAllQuestionsForTopic(urlParts[2]),
    };
};

const addQuestionToTopicById = async ({ request, response, render, state }) => {

    const questionData = await getQuestionData(request);
    
    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules,
    );

    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        render("topicPageById.eta", questionData);
    } else {

        questionData.user = await state.session.get("user");

        // Call the service responsible for adding questions with the given parametres
        await questionService.addQuestionToTopic(questionData.name, questionData.currentTopic.id, questionData.user.id); 

        console.log("Input okay: redirecting");
        response.redirect(`/topics/${questionData.currentTopic.id}`);
    }  
};

const showQuestionById = async ({ params, render }) => {

    render("questionPage.eta", {
        currentQuestion: await questionService.retrieveQuestionById(params.qId),
        availableOptions: await optionService.listAllOptionsForQuestion(params.qId),
    });
};

const deleteQuestionById = async ({ params, response }) => {

    await questionService.deleteQuestionById(params.qId);

    response.redirect(`/topics/${params.tId}`);
};

export { addQuestionToTopicById, showQuestionById, deleteQuestionById };