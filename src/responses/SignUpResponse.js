export default class SignUpResponse {
    constructor (data) {
        this.id = data.id;
        this.email = data.email;
        this.name = data.name;
        this.role = data.role;
        this.department = data.department;
    }
}