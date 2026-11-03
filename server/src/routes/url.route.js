import express, { Router } from "express"  
import { getMyUrls, getUrl, receiveUrl } from "../controllers/url.controller.js";
import { optionalAuth, requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/receive-url").post(optionalAuth, receiveUrl);
router.route("/my-links").get(requireAuth, getMyUrls);
router.route("/u/:id").get(getUrl);
router.route("/u/:id").get(getUrl); // currently this url also serve the same purpose written in server.js but in this case the url become http://localhost:8000/api/v1/short/u/:id

export default router;