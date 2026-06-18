import express from "express";

const app = express();

app.use(express.json());

// importing routes here

import urlRouter from "./routes/url.route.js";

app.use("/api/v1/short", urlRouter);

export default app;