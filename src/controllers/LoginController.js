import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Employee from '../models/Employee.js';
import { where } from "sequelize";

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const validatedData = matchedData(req);

        const user = await Employee.findOne({
            where: {
                email: validatedData.email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const match = await bcrypt.compare(validatedData.password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        const userId = user.id;
        const userName = user.name;
        const userEmail = user.email;

        const accessToken = jwt.sign(
            { userId, userName, userEmail }, 
            process.env.SECRET_ACCESS_TOKEN,
            {
                expiresIn: '2h'
            }
        );

        const refreshToken = jwt.sign(
            { userId, userName, userEmail }, 
            process.env.SECRET_REFRESH_TOKEN,
            {
                expiresIn: '1d'
            }
        );

        await Employee.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });

    } catch (error) {
        console.log(error.message);
        return res.json({
            message: 'Server Error',
            errorMessage: error.message
        });
    }
}

export default {
    login
}