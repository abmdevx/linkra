import express, { Router } from "express"  
import { receiveUrl } from "../controllers/url.controller.js";
import { getUrl } from "../controllers/url.controller.js";

const router = Router();

router.route("/receive-url").post(receiveUrl);
router.route("/u/:id").get(getUrl); // currently this url also serve the same purpose written in server.js but in this case the url become http://localhost:8000/api/v1/short/u/:id

export default router;