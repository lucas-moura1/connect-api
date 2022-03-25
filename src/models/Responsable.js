import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index.js'

class Responsavel extends Model {}

Responsavel.init(
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
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grupoPais: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        // modelName: 'responsavel',
        charset: 'utf8',
        timestamps: true,
        freezeTableName: true
    }
)

export default Responsavel
