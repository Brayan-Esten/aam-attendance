import { Router } from "express";

import attendanceRoute from "./AttendanceRoute.js";
import authRoute from "./AuthRoute.js";

const router = Router();

router.use(attendanceRoute);
router.use(authRoute);

export default router;