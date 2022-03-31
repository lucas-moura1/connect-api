import logger from '../config/logger.js'
import sequelize from '../database/index.js'

const database = async (req, res, next) => {
    try {
        await sequelize.authenticate()
        logger.info('Connection has been established successfully.')
    } catch (error) {
        logger.error('Unable to connect to the database:', error)
    }

    next()
}

export default database
