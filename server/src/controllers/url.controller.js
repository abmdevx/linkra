import Url from "../models/url.model.js";
import { nanoid } from "nanoid";

export async function receiveUrl(req, res) {
    try {
        const { url } = req.body;
        const id = nanoid(5);

        if(!url)
        {
            return res.status(400).json({
                success: false,
                message: "Please enter an url to continue"
            });
        }
            
        const modifiedUrl = url.trim();
        
        if (modifiedUrl.includes(" ")) 
        {
            return res.status(400).json({
                success: false,
                message: "URL cannot contain spaces"
            });
        }

        try {
            new URL(modifiedUrl);
        } catch {
            return res.status(400).json({
                success: false,
                message: "Invalid URL format"
            });
        }

        const shortedURL = await Url.create({
            originalUrl: modifiedUrl,
            shortUrl: id,
            user: req.user?._id || null,
        })

           return res.status(200).json({
            success: true,
            message: "URL received successfully",
            data: shortedURL
        });
    } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}

export async function getMyUrls(req, res) {
    try {
        const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
        return res.json({ success: true, data: urls });
    } catch (error) {
        console.error("Get user URLs error:", error);
        return res.status(500).json({ success: false, message: "Unable to load your links." });
    }
}

export async function getUrl(req, res) {
    try {
        const { id } = req.params;
    
        const findUrl = await Url.findOne({shortUrl: id});

        if(!findUrl)
        {
            return res.status(400).json({
                success: false,
                message: "url not founded or not existed!"
            });
        }
        
        return res.redirect(findUrl.originalUrl)
    } catch (error) {
           console.log(error)
           return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}