const express = require("express");
const supertokens = require("supertokens-node");
const {middleware, errorHandler } = require("supertockens-node/framework/express");
const cors = require("cors");
const app = express();

require("./supertokensConfig");

//Middleware for SuperTokens
app.use(cors({
	origin: "http://localhost:3000",
	allowedHeaders: ["content-type", ...supertokens.getAllCORSHeader()],
	credentials: true
}));

app.use(middleware());

// this is the routes

app.use(errorHandler());

app.listen(3001, () => console.log("API server running on port 3001"));

