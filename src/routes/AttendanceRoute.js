import { Router } from "express";

import AttendanceController from "../controllers/AttendanceController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import DynamicUploader from "../middleware/Multer.js";

const router = Router();

const uploader = new DynamicUploader();
const upload = uploader.getUploader('uploads/attendances')

router.post('/api/verify-attendance', 
    verifyToken,
    upload.single('proofImage'), 
    AttendanceController.verifyAttendance
);

export default router;