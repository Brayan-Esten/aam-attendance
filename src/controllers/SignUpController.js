import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";

import Employee from '../models/Employee.js';
import SignUpResponse from "../responses/SignUpResponse.js";

const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const validatedData = matchedData(req);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(validatedData.password ,salt);

        const employee = await Employee.create({
            ...validatedData,
            password: hashedPassword
        });

        return res.status(201).json({
            message: 'Sign up success',
            data: new SignUpResponse(employee)
        });

    } catch (error) {
        console.log(error.message);
        return res.json({
            message: 'Server Error',
            errorMessage: error.message
        });
    }
}

export default {
    signUp
}