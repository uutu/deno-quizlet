import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    return {
        name: params.get("name"),
        availableTopics: await topicService.listAvailableTopics(),
    };
};

const listAvailableTopics = async ({ request, render, state }) => {
    const user = await state.session.get("user");
    
    render("topics.eta", {
        availableTopics: await topicService.listAvailableTopics(),
        user: user,
    });
};

const showTopicQuestionsById = async ({ params, render }) => {

    render("topicPageById.eta", {
        currentTopic: await topicService.retrieveTopicById(params.id),
        availableQuestions: await questionService.listAllQuestionsForTopic(params.id),
    });
};

const addNewTopic = async ({ request, render, response, state }) => {
    const topicData = await getTopicData(request);
    topicData.user = await state.session.get("user");

    const [passes, errors] = await validasaur.validate(
        topicData,
        topicValidationRules,
    );
    
    if (!passes) {
        console.log(errors);
        topicData.validationErrors = errors;
        render("topics.eta", topicData);
    } else {

        if (topicData.user.admin === true) {
            await topicService.addNewTopic(
                topicData.user,
                topicData.name,
            );
        }
        
        response.redirect("/topics");
    }
};

const deleteTopicById = async ({ params, request, response, state }) => {
    const user = await state.session.get("user");
    const id = params.id;

    if (user.admin === true) {
        console.log("hello, I'm admin");
        console.log(id);

        // Split the SQL queries into separate simpler ones !
        await topicService.deleteTopicByIdCascade(id);
        
    }
    response.redirect("/topics");
};

export { listAvailableTopics, showTopicQuestionsById, addNewTopic, deleteTopicById };