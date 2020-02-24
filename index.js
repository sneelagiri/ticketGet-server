const express = require("express");
const cors = require("cors");
const app = express();
const Sse = require("json-sse");
const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
