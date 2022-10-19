import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const listAvailableTopics = async ({ render }) => {
    render("topics.eta", {
        availableTopics: await topicService.listAvailableTopics(),

    });
};

const showTopicQuestionsById = async ({ params, render }) => {

    render("topicPageById.eta", {
        currentTopic: await topicService.retrieveTopicById(params.id),
        availableQuestions: await questionService.listAllQuestionsForTopic(params.id),
    });
};

export { listAvailableTopics, showTopicQuestionsById };