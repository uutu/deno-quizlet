import * as questionService from "../../services/questionService.js";
import { assertMatch } from "../../deps.js";

Deno.test({
    name: "addQuestionToTopic adds a new question to the database with the given parameters (q, tId, uId)",
    async fn() {

        await questionService.addQuestionToTopic("Does this test work?", 1, 1);

        const result = await questionService.listAllQuestionsForTopic(1);

        // Compare the question_text added to the regular expression
        assertMatch(result[0].question_text, new RegExp("Does this test work?"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "listAllQuestionsForTopic returns an array with objects related to an existing topic & question (id: 1 in fresh DB state)",
    async fn() {
        const result = await questionService.listAllQuestionsForTopic(1);

        // Comparing against a question with question_text: ""
        assertMatch(result[0].question_text, new RegExp("Does this test work?"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});