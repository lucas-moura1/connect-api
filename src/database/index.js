import Sequelize from 'sequelize'
import databaseUrl from '../config/database.js'

const sequelize = new Sequelize(databaseUrl.url, {
    logging: false
})

export default sequelize
