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

Deno.test({
    name: "GET request to route /auth/register displays the registering HTML page",
    async fn() {
        const request = await superoak(app);
        await request.get("/auth/register")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST request to route /auth/login with admin login redirects and returns /topics",
    async fn() {
        const request = await superoak(app);
        await request.post("/auth/login")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .send("email=admin%40admin.com&password=123456")
            .expect("Redirecting to /topics.")
            .expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});