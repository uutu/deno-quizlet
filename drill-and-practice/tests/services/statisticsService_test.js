import { assertMatch } from "../../deps.js";
import * as statisticService from "../../services/statisticsService.js";

Deno.test({
    name: "returnServiceStatistics should return a result object with topics count of any value (current DB state)",
    async fn() {
        const result = await statisticService.returnServiceStatistics();
        assertMatch(result.topics.count, new RegExp(/^[\w-_.]*$/));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "returnServiceStatistics should return a result object with answers count of any value (current DB state)",
    async fn() {
        const result = await statisticService.returnServiceStatistics();
        assertMatch(result.answers.count, new RegExp(/^[\w-_.]*$/));
    },
    sanitizeResources: false,
    sanitizeOps: false,
});