import * as Yup from "yup"
import Category from "../models/Category"

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name } = request.body

    let path
    if (request.file) {
      path = request.file.filename
    }

    const categoryExists = await Category.findOne({
      where: {
        name
      }
    })

    if (categoryExists) {
      return response.status(400).json({ error: "Category already exists" })
    }

    const { id } = await Category.create({ name, path })

    return response.json({ id, name })
  }

  async index(request, response) {
    const categories = await Category.findAll()

    return response.json(categories)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name } = request.body

    const { id } = request.params

    const category = Category.findByPk(id)

    if (!category) {
      return response
        .status(401)
        .json({ error: "Make sure your category id is correct" })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    await Category.update(
      { name, path },
      {
        where: {
          id
        }
      }
    )

    return response.status(200).json({ id, name, path })
  }
}

export default new CategoryController()
