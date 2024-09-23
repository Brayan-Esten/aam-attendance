export default class VerifyAttendanceResponse {
    constructor(data) {
        this.employeeId = data.employee_id,
        this.filePath = `${process.env.APP_URL}:${process.env.PORT}` + '/uploads/attendances/' + data.file_path,
        this.attendanceTime = data.createdAt
    }
}