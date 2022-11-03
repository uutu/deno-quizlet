import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";
import * as optionService from "../../services/optionService.js";

const showAvailableTopics = async ({ request, render }) => {

    render("quiz.eta", {
        availableTopics: await topicService.listAvailableTopics(),
    });

};

const retrieveRandomQuestionForTopic = async ({ params, request, response, render }) => {

    const result = await quizService.retrieveRandomQuestion(params.tId);

    console.log(result);
    // If no results, inform the user
    if (!result) {
        render("noResult.eta");
    } else {
        // Redirect to question
        response.redirect(`/quiz/${result.topic_id}/questions/${result.id}`);
    }  
};

const displayQuizForQuestion = async ({ params, render }) => {

    const qOptionlog = await quizService.retrieveOptionsForQuestion(params.qId);
    console.log(qOptionlog); // {"yes"}


    render("quizPage.eta", {
        question: await quizService.retrieveQuestionById(params.qId),
        questionOptions: await quizService.retrieveOptionsForQuestion(params.qId),
    });
};

const storeAnswerAndRedirect = async ({ params, response, state }) => {

    const user = await state.session.get("user");

    await quizService.storeAnswerForUser(user.id, params.qId, params.oId);

    const answer = await optionService.checkForCorrectness(params.oId);
    
    // Redirect based on correct/incorrect answer
    if (answer.is_correct === true) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`); 
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
};

const renderCorrectPage = async ({ render, params }) => {
    render("correctAnswer.eta", {
        topicId: params.tId,
    });
};

const renderIncorrectPage = async ({ render, params }) => {
    render("incorrectAnswer.eta", {
        topicId: params.tId,
        correctAnswers: await optionService.retrieveCorrectOptions(params.qId)
    })
};

export { showAvailableTopics, retrieveRandomQuestionForTopic, displayQuizForQuestion, storeAnswerAndRedirect, renderCorrectPage, renderIncorrectPage };