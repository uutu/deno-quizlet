import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listAvailableTopics);
router.get("/topics/:id", topicController.showTopicQuestionsById);

router.post("/topics/:id/questions", questionController.addQuestionToTopicById);

export { router };
