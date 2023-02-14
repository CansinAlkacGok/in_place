import { check, validationResult } from 'express-validator';

let usersValidation = [

    check("firstName").escape().trim().isLength({ min: 3 }).withMessage("minimum character required is 3"),

    check("lastName").escape().trim().isLength({ max: 20 }).withMessage("maximum characters allowed are 20"),

    check("email").isEmail().toLowerCase().withMessage("please provide us with valid email"),

    check("password").exists().isStrongPassword().withMessage("please make sure that your password has at least one Capital letter, one lower case, one number, one symbol and at least 8 characters"),

    (req, res, next) => {

        console.log(req.body)
        const result = validationResult(req)

        if (result.isEmpty()) {
            next()
        } else {

            const error = result.errors.reduce((acc, currentItem) => {

                acc[currentItem.param] = currentItem.msg
                return acc;

            }, {})

            next({ message: error })
        }
    }
] 

export default usersValidation