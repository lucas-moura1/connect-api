import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/index.js'
import Connect from './Connect.js'
import Culto from './Cult.js'

class ConnectCulto extends Model {}

ConnectCulto.init(
    {
        ConnectId: {
            type: DataTypes.INTEGER,
            references: {
                model: Connect,
                key: 'id'
            }
        },
        CultoId: {
            type: DataTypes.INTEGER,
            references: {
                model: Culto,
                key: 'id'
            }
        },
        numeroPulseira: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        charset: 'utf8',
        timestamps: true,
        freezeTableName: true
    }
)

export default ConnectCulto
