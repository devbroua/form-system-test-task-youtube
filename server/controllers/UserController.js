import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import UserModel from "./../models/User.js"

export const register = async (req, res) => {
  try {
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
    })

    const user = await doc.save()

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretKeyForToken",
      {
        expiresIn: "30d",
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Register failed",
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    )

    if (!isPasswordValid) {
      return res.status(404).json({
        message: "wrong email or password",
      })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretKeyForToken",
      {
        expiresIn: "30d",
      }
    )

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Login failed",
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json(userData)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Loginisation failed",
    })
  }
}
