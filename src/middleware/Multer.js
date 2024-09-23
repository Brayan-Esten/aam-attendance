import multer from "multer";
import path from "path";
import fs from "fs";

export default class DynamicUploader {
    constructor(baseDirectory = 'public/images') {
        this.baseDirectory = baseDirectory;
    }

    getUploader(subDirectory = '') {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const finalPath = path.join(this.baseDirectory, subDirectory);

                fs.mkdirSync(finalPath, { recursive: true });

                cb(null, finalPath);
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }
        });

        return multer({
            storage: storage,
            limits: {
                fileSize: 3 * 1000 * 1000
            }
        });
    }
}