import logger from '../config/logger.js'
import * as connectRepository from '../repositories/connectRepository.js'
import * as connectCultService from './connectCultService.js'
import { RequestError } from '../errors/RequestError.js'

const getAllConnectors = async () => {
    try {
        logger.info('[CONNECT SERVICE] Process to get all connectors')

        const connectors = await connectRepository.getAll()

        return connectors
    } catch (error) {
        logger.error(`[CONNECT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const createConnect = async (connectDatas) => {
    try {
        logger.info('[CONNECT SERVICE] Process to create a connect')

        const hasResponsableRelationship = !!connectDatas.connect.responsavel

        const connect = await connectRepository.create(
            connectDatas.connect,
            hasResponsableRelationship
        )

        const connectCult = await connectCultService.createConnectCult(
            connect,
            connectDatas.cultoId,
            connectDatas.numeroPulseira
        )

        return connectCult || connect
    } catch (error) {
        logger.error(`[CONNECT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    getAllConnectors,
    createConnect
}