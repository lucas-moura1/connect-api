import logger from '../config/logger.js'
import * as connectRepository from '../repositories/connectRepository.js'
import * as connectCultService from './connectCultService.js'

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

const getOneConnect = async (phone) => {
    try {
        logger.info('[CONNECT SERVICE] Process to get one connect')

        const connect = await connectRepository.getOne(phone)

        return connect
    } catch (error) {
        logger.error(`[CONNECT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const createConnect = async (connectDatas) => {
    try {
        logger.info('[CONNECT SERVICE] Process to create a connect')

        const hasResponsableRelationship = !!connectDatas.connect.responsavels

        const connect = await connectRepository.create(
            connectDatas.connect,
            hasResponsableRelationship
        )

        const connectCultDatas = {
            numeroPulseira: connectDatas.numeroPulseira,
            observacoes: connectDatas.observacoes
        }

        const connectCult = await connectCultService.createNewConnectCult(
            connect,
            connectDatas.cultoId,
            connectCultDatas
        )

        return connectCult || connect
    } catch (error) {
        logger.error(`[CONNECT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    getAllConnectors,
    getOneConnect,
    createConnect
}
