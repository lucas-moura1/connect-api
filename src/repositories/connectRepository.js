import { Op } from 'sequelize'
import { Connect, Responsavel } from '../models/index.js'
import logger from '../config/logger.js'
import { RequestError } from '../errors/RequestError.js'

const getAll = async () => {
    try {
        logger.info('[CONNECT REPOSITORY] Getting all connectors')

        const connectors = await Connect.findAll({ include: [Responsavel] })

        return connectors
    } catch (error) {
        logger.error(
            `[CONNECT REPOSITORY] Error to getting all connectors >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}

const getById = async (id) => {
    try {
        logger.info('[CONNECT REPOSITORY] Getting a connect by id')

        const connect = await Connect.findOne({
            where: { id }
        })

        return connect
    } catch (error) {
        logger.error(
            `[CONNECT REPOSITORY] Error to getting a connect >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}
const getOne = async (name) => {
    try {
        logger.info('[CONNECT REPOSITORY] Getting a connect by name')

        const connect = await Connect.findAll({
            where: {
                nome: {
                    [Op.like]: `%${name}%`
                }
            }
        })

        return connect
    } catch (error) {
        logger.error(
            `[CONNECT REPOSITORY] Error to getting a connect >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}

const create = async (datas, hasRelationship = false) => {
    try {
        logger.info('[CONNECT REPOSITORY] Creating a connect')

        const relationship = hasRelationship ? { include: Responsavel } : {}

        const connect = await Connect.create(datas, relationship)

        return connect
    } catch (error) {
        logger.error(
            `[CONNECT REPOSITORY] Error to creating a connect >> ${JSON.stringify(error)}`
        )

        throw new RequestError(error.message)
    }
}

export {
    getAll,
    getById,
    getOne,
    create
}
