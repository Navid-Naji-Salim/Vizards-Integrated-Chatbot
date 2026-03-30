import { Router } from "express";
import multer from "multer";
import { readDocument } from "../services/documentService.js";

const router = Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/upload", upload.single("file"), (req, res) => {

    if(!req.file){
        return res.status(400).json({
            error:"No file uploaded"
        });
    }

    const text = readDocument(req.file.path);

    res.json({
        message:"File uploaded",
        preview:text.substring(0,200)
    });

});

export default router;