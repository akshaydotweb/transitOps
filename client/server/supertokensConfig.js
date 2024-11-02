const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

supertokens.init({
	framework: "express",
	supertokens: {
		connectionURI: "https://try.supertokens.io",
		apiKey: ""
	},
	appInfo: {
		appName: "transitops",
		apiDomain: "http://localhost:3001",
		websiteDomain: "http://localhost:3000"
	},
	recipeList: [
		EmailPassword.init(),
		Session.init()
	]
});
