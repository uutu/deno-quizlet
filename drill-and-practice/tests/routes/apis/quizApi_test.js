import { app } from "../../../app.js";
import { superoak } from "../../../deps.js";

Deno.test("it will allow you to make assertions if you await it", async () => {
    const request = await superoak(app);
    await request.get("/").expect(200).expect("Hello Deno!");
  });