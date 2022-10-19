import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
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

const addQuestionToTopicById = async ({ request, response, render }) => {

    const questionData = await getQuestionData(request);

    const urlParts = request.url.pathname.split("/");
    
    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules,
    );

    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        render("topicPageById.eta", questionData);
    } else {
        /*
         * DB add
         */
        console.log("Input okay: redirecting");
        response.redirect(`/topics/${urlParts[2]}`);
    }  
};

export { addQuestionToTopicById };