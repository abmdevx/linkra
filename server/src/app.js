import express from "express";
import { getUrl } from "./controllers/url.controller.js";

const app = express();

app.use(express.json());

// importing routes here

import urlRouter from "./routes/url.route.js";

app.use("/api/v1/short", urlRouter);

app.get("/u/:id", getUrl); // currently using this route for short link

export default app;