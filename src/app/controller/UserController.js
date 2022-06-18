import { v4 } from "uuid"
import * as Yup from "yup"
import jwt from "jsonwebtoken"
import authConfig from "../../config/auth"

import User from "../models/User"

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      last_name: Yup.string().required(),
      birth_date: Yup.string().required(),
      number: Yup.string().required(),
      email: Yup.string().email().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      password: Yup.string().required().min(6),
      allow_show_email: Yup.boolean()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      name,
      last_name,
      birth_date,
      number,
      email,
      state,
      city,
      password,
      allow_show_email
    } = request.body

    const userExists = await User.findOne({
      where: {
        email
      }
    })

    if (userExists) {
      return response.status(409).json({ error: "User already exists" })
    }

    const user = await User.create({
      id: v4(),
      name,
      last_name,
      birth_date,
      number,
      email,
      state,
      city,
      password,
      allow_show_email
    })

    return response.status(201).json({
      id: user.id,
      name,
      last_name,
      birth_date,
      number,
      state,
      city,
      email,
      allow_show_email
    })
  }

  async index(request, response) {
    const users = await User.findAll()

    return response.json(users)
  }

  async indexOne(request, response) {
    const { id } = request.params
    const user = await User.findByPk(id)

    return response.json(user)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      last_name: Yup.string(),
      birth_date: Yup.string(),
      number: Yup.string(),
      email: Yup.string().email(),
      state: Yup.string(),
      city: Yup.string(),
      password: Yup.string().min(6),
      allow_show_email: Yup.boolean()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const findUser = User.findByPk(id)

    if (!findUser) {
      return response
        .status(401)
        .json({ error: "Make sure your user id is correct" })
    }

    const {
      name,
      last_name,
      birth_date,
      number,
      email,
      state,
      city,
      password,
      allow_show_email
    } = request.body

    await User.update(
      {
        name,
        last_name,
        birth_date,
        number,
        email,
        state,
        city,
        password,
        allow_show_email
      },
      {
        where: {
          id
        }
      }
    )

    return response.status(200).json({
      name,
      last_name,
      birth_date,
      number,
      state,
      city,
      email,
      allow_show_email,
      token: jwt.sign({ id: findUser.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new UserController()
