export default {
    email: {
        isEmail: true,
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                max: 255
            }
        }
    },
    password: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                min: 8
            }
        }
    },
    name: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                max: 255
            }
        }
    },
    role: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                max: 255
            }
        }
    },
    department: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                max: 255
            }
        }
    }
}