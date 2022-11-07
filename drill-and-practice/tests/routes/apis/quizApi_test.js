import { app } from "../../../app.js";
import { superoak } from "../../../deps.js";

Deno.test({
    name: "GET request to API route /api/questions/random returns status 200 and a JSON object {}",
    async fn() {
        const request = await superoak(app);
        await request.get("/api/questions/random")
            .expect(200)
            .expect("Content-Type", "application/json; charset=UTF-8");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to API route /api/questions/answer with bogus data returns status 404",
    async fn() {
        const request = await superoak(app);
        await request.post("/api/questions/answer")
        .set("Content-Type", "application/json")
        .send('{"questionId":"9999", "optionId":"9999"}')
        .expect(404)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});