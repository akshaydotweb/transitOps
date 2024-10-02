import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
	    appInfo: {
		            appName: "Railway Management System",
		            apiDomain: "http://localhost:3001", // Backend URL
		            websiteDomain: "http://localhost:3000" // Frontend URL
		        },
	    recipeList: [
		            EmailPassword.init(), // Email/Password login
		            Session.init() // Session management
		        ]
});

