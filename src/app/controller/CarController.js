import * as Yup from "yup"
import Car from "../models/Car"
import Category from "../models/Category"

class CarController {
  async store(request, response) {
    const schema = Yup.object().shape({
      brand: Yup.string().required(),
      model: Yup.string().required(),
      version: Yup.string().required(),
      gear: Yup.string().required(),
      year: Yup.number().required(),
      price: Yup.string().required(),
      km: Yup.number().required(),
      description: Yup.string().required(),
      category_id: Yup.number().required(),
      user_email: Yup.string().required(),
      user_name: Yup.string().required(),
      user_number: Yup.string().required(),
      user_state: Yup.string().required(),
      user_city: Yup.string().required(),
      user_allow_show_email: Yup.string().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { filename: path } = request.file
    const {
      brand,
      model,
      version,
      gear,
      year,
      price,
      km,
      description,
      category_id,
      user_name,
      user_email,
      user_number,
      user_state,
      user_city,
      user_allow_show_email
    } = request.body

    const car = await Car.create({
      brand,
      model,
      version,
      gear,
      year,
      price,
      km,
      description,
      category_id,
      user_name,
      user_email,
      user_number,
      user_state,
      user_city,
      user_allow_show_email,
      path
    })

    return response.json(car)
  }

  async index(request, response) {
    try {
      const cars = await Car.findAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"]
          }
        ]
      })

      return response.json(cars)
    } catch (err) {
      return response.status(500).json({ error: err })
    }
  }

  async indexOne(request, response) {
    const { id } = request.params
    const car = await Car.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"]
        }
      ]
    })

    return response.json(car)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      brand: Yup.string(),
      model: Yup.string(),
      version: Yup.string(),
      gear: Yup.string(),
      year: Yup.string(),
      price: Yup.string(),
      km: Yup.number(),
      description: Yup.string(),
      category_id: Yup.number()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { id } = request.params

    const car = await Car.findByPk(id)

    if (!car) {
      return response
        .status(401)
        .json({ error: "Make sure your vehicle id is correct" })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const {
      brand,
      model,
      version,
      gear,
      year,
      price,
      km,
      description,
      category_id
    } = request.body

    await Car.update(
      {
        brand,
        model,
        version,
        gear,
        year,
        price,
        km,
        description,
        category_id,
        path
      },
      {
        where: {
          id
        }
      }
    )

    return response.status(200).json({ success: "Car successfuly updated" })
  }

  async delete(request, response) {
    const { id } = request.params

    try {
      await Car.destroy({
        where: {
          id
        }
      })
      return response.status(200).json({ success: "Vehicle deleted" })
    } catch (err) {
      return response.status(400).json({ error: err })
    }
  }
}

export default new CarController()
