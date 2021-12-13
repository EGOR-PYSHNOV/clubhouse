'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class SmsCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SmsCode.init(
        {
            code: {
                type: DataTypes.STRING,
                unique: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: 'SmsCode',
        }
    )
    return SmsCode
}
