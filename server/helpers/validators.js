import { body } from "express-validator"

export const registerValidator = [
  body("email", "Wrong email format").isEmail().isString(),
  body("password", "Wrong password format")
    .isString()
    .isLength({ min: 5, max: 15 }),
]

export const loginValidator = [
  body("email", "Wrong email format").isEmail().isString(),
  body("password", "Wrong password format")
    .isString()
    .isLength({ min: 5, max: 15 }),
]
