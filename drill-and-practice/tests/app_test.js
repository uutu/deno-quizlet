Deno.test("Test /", async () => {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
});