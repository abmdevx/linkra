import express, { Router } from "express"  
import { receiveUrl } from "../controllers/url.controller.js";
import { getUrl } from "../controllers/url.controller.js";

const router = Router();

router.route("/receive-url").post(receiveUrl);
router.route("/u/:id").get(getUrl);

export default router;