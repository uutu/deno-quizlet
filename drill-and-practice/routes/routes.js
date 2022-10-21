import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listAvailableTopics);
router.get("/topics/:id", topicController.showTopicQuestionsById);

router.post("/topics/:id/questions", questionController.addQuestionToTopicById);
router.get("/topics/:id/questions/:qId", questionController.showQuestionById);

router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestionById);


router.post("/topics/:id/questions/:qId/options", optionController.addOptionToQuestion);

router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOptionById);

export { router };
