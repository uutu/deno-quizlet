
const authMiddleware = async (context, next) => {
    const user = await context.state.session.get("user");

    // Add restrictions to illegal paths, check for them
    if (!user) {
        context.response.redirect("/auth/login");
    } else {
        await next();
    }
};

export { authMiddleware };