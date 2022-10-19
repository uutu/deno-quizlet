import * as topicService from "../../services/topicService.js";

const listAvailableTopics = async ({ render }) => {
    render("topics.eta", {
        availableTopics: await topicService.listAvailableTopics(),

    });
};

export { listAvailableTopics };