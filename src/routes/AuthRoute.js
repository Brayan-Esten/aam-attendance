import { Router } from "express";
import { checkSchema } from "express-validator";

import LoginController from "../controllers/LoginController.js";
import SignUpController from "../controllers/SignUpController.js";

import EmployeeLoginRequest from "../requests/EmployeeLoginRequest.js";
import EmployeeSignUpRequest from "../requests/EmployeeSignUpRequest.js";

const router = Router();

router.post('/api/employee-login', checkSchema(EmployeeLoginRequest), LoginController.login);
router.post('/api/employee-sign-up', checkSchema(EmployeeSignUpRequest), SignUpController.signUp);

export default router;