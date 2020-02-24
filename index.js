const express = require("express");
const cors = require("cors");
const app = express();
const Sse = require("json-sse");
const User = require("./users/model");
const userRouter = require("./users/router");
const Event = require("./events/model");
const Ticket = require("./tickets/model");
const Comment = require("./comments/model");
const authRouter = require("./authentication/router");

const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);
app.use(authRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
