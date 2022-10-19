import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listAvailableTopics);
router.get("/topics/:id", topicController.showTopicQuestionsById);

export { router };
