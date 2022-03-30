import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index.js'

class Culto extends Model {}

Culto.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario: {
            type: DataTypes.ENUM('10h', '18h', '20h'),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'culto',
        timestamps: true,
        freezeTableName: true
    }
)

export default Culto
