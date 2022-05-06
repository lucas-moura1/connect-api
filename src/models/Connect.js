import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index.js'

class Connect extends Model {}

Connect.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataNascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        modelName: 'connect',
        timestamps: true,
        freezeTableName: true
    }
)

export default Connect
