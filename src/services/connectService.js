import logger from '../config/logger.js'
import * as connectRepository from '../repositories/connectRepository.js'
import { RequestError } from '../errors/RequestError.js'

const getAllConnects = async () => {
    try {
        const connectors = await connectRepository.getAll()

        return connectors
    } catch (error) {
        logger.error(`[CONNECT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const getConnect = async (name) => {
    try {
        const connect = await connectRepository.getOne(name)

        if (connect.length === 0) throw new RequestError('Not Found', 404)

        return connect
    } catch (error) {
        logger.error(`[CONNECT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const createConnect = async (connectDatas) => {
    try {
        const hasResponsableRelationship = !!connectDatas?.responsavels

        const connect = await connectRepository.create(
            connectDatas,
            hasResponsableRelationship
        )

        return connect
    } catch (error) {
        logger.error(`[CONNECT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    getAllConnects,
    getConnect,
    createConnect
}
