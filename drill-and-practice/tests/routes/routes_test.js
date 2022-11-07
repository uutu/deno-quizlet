import { app } from "../../app.js";
import { superoak } from "../../deps.js";

Deno.test({
    name: "GET request to route /topics returns 302 Found / Redirect for an unauthorised user",
    async fn() {
        const request = await superoak(app);
        await request.get("/topics")
            .expect(302)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to route /topics redirects an unauthorised user to path /auth/login",
    async fn() {
        const request = await superoak(app);
        await request.post("/topics")
            .send("This_is_a_test")
            .expect("Redirecting to /auth/login.")
    },
    sanitizeResources: false,
    sanitizeOps: false,
});