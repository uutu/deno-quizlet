import { app } from "../app.js";
import { superoak } from "../deps.js";

Deno.test("Sending a simple GET request should return status code 200", async () => {
    //const app = new Application();
    const testClient = await superoak(app);
    await testClient.get("/")
        .expect(200);
});
