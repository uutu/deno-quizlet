import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as quizController from "./controllers/quizController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizApi from "./apis/quizApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerNewUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLoginRequest);

router.get("/topics", topicController.listAvailableTopics);
router.post("/topics", topicController.addNewTopic);
router.get("/topics/:id", topicController.showTopicQuestionsById);
router.post("/topics/:id/delete", topicController.deleteTopicById);

router.post("/topics/:id/questions", questionController.addQuestionToTopicById);
router.get("/topics/:id/questions/:qId", questionController.showQuestionById);

router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestionById);
router.post("/topics/:id/questions/:qId/options", optionController.addOptionToQuestion);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOptionById);

router.get("/quiz", quizController.showAvailableTopics);
router.get("/quiz/:tId", quizController.retrieveRandomQuestionForTopic);
router.get("/quiz/:tId/questions/:qId", quizController.displayQuizForQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.storeAnswerAndRedirect);
router.get("/quiz/:tId/questions/:qId/correct", quizController.renderCorrectPage);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.renderIncorrectPage);

router.get("/api/questions/random", quizApi.returnRandomQuestion);
router.post("/api/questions/answer", quizApi.checkAnswer);

export { router };
