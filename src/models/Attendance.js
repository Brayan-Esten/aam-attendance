import { DataTypes } from "sequelize";
import { orm as db } from "../config/database/MySQL.js";

const Employee = db.define('attendances', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

export default Employee;