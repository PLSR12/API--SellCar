import * as Yup from "yup"
import jwt from "jsonwebtoken"
import authConfig from "../../config/auth"
import User from "../models/User"

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    })

    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(401)
        .json({ error: "Make sure your email or password is correct" })
    }

    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect()

    const { email, password } = request.body

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) userEmailOrPasswordIncorrect()

    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect()

    return response.json({
      id: user.id,
      email,
      name: user.name,
      last_name: user.last_name,
      birth_date: user.birth_date,
      number: user.number,
      state: user.state,
      city: user.city,
      allow_show_email: user.allow_show_email,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    })
  }
}

export default new SessionController()
