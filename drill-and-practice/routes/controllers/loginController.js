import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";


const processLoginRequest = async ({ request, response, render, state }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const retrieveUserFromDatabase = await userService.returnUserByEmail(
        params.get("email"),
    );

    const errorMessage = {};

    if (retrieveUserFromDatabase.length != 1) {

        errorMessage["feedback"] = "The email you entered does not exist in the service. Please try again.";
        render("login.eta", errorMessage);
        return;
    }

    const userData = retrieveUserFromDatabase[0];
    const passwordMatches = await bcrypt.compare(
        params.get("password"),
        userData.password,
    );

    if (!passwordMatches) {
        errorMessage["feedback"] = "The password you entered is incorrect. Please try again.";
        render("login.eta", errorMessage);
        return;
    }

    await state.session.set("user", userData);
    response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
    render("login.eta");
};

export { showLoginForm, processLoginRequest };