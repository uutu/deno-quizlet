import * as questionService from "../../services/questionService.js";
import { assertMatch } from "../../deps.js";

Deno.test({
    name: "listAllQuestionsForTopic returns an array with objects related to an existing topic & question (id: 6 in current DB state)",
    async fn() {
        const result = await questionService.listAllQuestionsForTopic(6);

        // Comparing against a question with question_text: ""
        assertMatch(result[0].question_text, new RegExp("Do you like Finnish?"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "addQuestionToTopic adds a new question to the database with the given parameters (q, tId, uId)",
    async fn() {

        await questionService.addQuestionToTopic("Does this test work?", 6, 2);

        const result = await questionService.listAllQuestionsForTopic(6);

        // Compare the question_text added to the regular expression
        assertMatch(result[6].question_text, new RegExp("Does this test work?"));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});