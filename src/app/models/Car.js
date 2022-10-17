import Sequelize, { Model } from 'sequelize'

class Car extends Model {
  static init(sequelize) {
    super.init(
      {
        brand: Sequelize.STRING,
        model: Sequelize.STRING,
        version: Sequelize.STRING,
        gear: Sequelize.STRING,
        year: Sequelize.INTEGER,
        price: Sequelize.STRING,
        km: Sequelize.STRING,
        description: Sequelize.STRING,
        user_name: Sequelize.STRING,
        user_number: Sequelize.STRING,
        user_state: Sequelize.STRING,
        user_city: Sequelize.STRING,
        user_allow_show_email: Sequelize.BOOLEAN,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3100/car-file/${this.path}`
          },
        },
      },
      {
        sequelize,
      }
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    })
    this.belongsTo(models.User, {
      foreignKey: 'user_email',
      as: 'user',
    })
  }
}

export default Car
