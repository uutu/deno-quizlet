import { app } from "../../../app.js";
import { superoak } from "../../../deps.js";

Deno.test("Sending a simple GET request should return status code 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect(200);
});

