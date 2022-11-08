import { assertArrayIncludes } from "../../deps.js";
import * as topicService from "../../services/topicService.js";

Deno.test({
    name: "listAvailableTopics returns an array with objects with an expected structure (id, user_id, name) for all available topics (in current DB state)",
    async fn() {
        const result = await topicService.listAvailableTopics();
        
        // Comparison object for expected values within the query result
        const expectedStructure = {
            id: null,
            user_id: null,
            name: null,
        };

        assertArrayIncludes(result, expectedStructure);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "retrieveTopicById returns an object with the expected structure for topic with id parameter (id: 6 in current DB)",
    async fn() {
        const result = await topicService.retrieveTopicById(6);

        // Comparison object for expected values within the query result
        const expectedStructure = {
            id: undefined,
            user_id: undefined,
            name: undefined,
        };

        assertArrayIncludes(result, expectedStructure);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "addNewTopic inserts a new topic in the DB that matches the given name parameter",
    async fn() {

        //user_id: 2 a regular user, running the test multiple times violates unique key constraint and raises an error
        await topicService.addNewTopic(2, "Test_Topic"); 

        const result = await topicService.listAvailableTopics();

        const expectedResult = {
            id: undefined,
            user_id: null,
            name: "Test_Topic",
        };

        // assertArrayIncludes can find both a value within an array and an array of values within an array
        assertArrayIncludes(result, expectedResult);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});