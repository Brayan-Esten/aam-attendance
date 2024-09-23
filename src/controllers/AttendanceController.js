import { validationResult, matchedData } from "express-validator";

import Attendance from "../models/Attendance.js";
import VerifyAttendanceResponse from "../responses/VerifyAttendanceResponse.js";

const verifyAttendance = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const attendance = await Attendance.create({
            employee_id: req.body.employeeId,
            file_path: req.file.filename
        });

        return res.status(201).json(new VerifyAttendanceResponse(attendance));

    } catch (error) {
        console.log(error.message);
        return res.json({
            message: 'Server Error',
            errorMessage: error.message
        });
    }
}

export default {
    verifyAttendance
}