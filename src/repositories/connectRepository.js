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
    create
}
