import express from "express";
import { getUrl } from "./controllers/url.controller.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONT_END_ORIGIN || true }));

// importing routes here

import urlRouter from "./routes/url.route.js";
import userRouter from "./routes/user.route.js";

app.use("/api/v1/short", urlRouter);
app.use("/api/v1/auth", userRouter);

app.get("/u/:id", getUrl); // currently using this route for short link

export default app;