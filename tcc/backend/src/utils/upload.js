import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.resolve("uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const extensao = path.extname(file.originalname).toLowerCase();
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extensao}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype?.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Envie apenas arquivos de imagem"));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
