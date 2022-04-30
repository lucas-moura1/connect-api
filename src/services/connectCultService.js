import logger from '../config/logger.js'
import * as connectCultRepository from '../repositories/connectCultRepository.js'
import * as cultRepository from '../repositories/cultRepository.js'
import * as connectRepository from '../repositories/connectRepository.js'
import { RequestError } from '../errors/RequestError.js'

const createNewConnectCult = async (connectDatas, cultoId, { numeroPulseira, observacoes }) => {
    try {
        logger.info('[CONNECT CULT SERVICE] Process to create a connect cult')

        if (!cultoId) return false

        const cultoDatas = await cultRepository.getOne(cultoId)

        const connectCultoDatas = {
            connectDatas,
            cultoDatas,
            numeroPulseira,
            observacoes
        }

        const connectCult = await connectCultRepository.associate(connectCultoDatas)

        return connectCult
    } catch (error) {
        logger.error(`[CONNECT CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const associateConnectCult = async ({ connectId, cultoId, numeroPulseira, observacoes = '' }) => {
    try {
        logger.info('[CONNECT CULT SERVICE] Process to associate a connect')

        const arrayGetPromise = [
            connectRepository.getById(connectId),
            cultRepository.getOne(cultoId)
        ]
        const [connectDatas, cultoDatas] = await Promise.all(arrayGetPromise)

        const connectCultoDatas = {
            connectDatas,
            cultoDatas,
            numeroPulseira,
            observacoes
        }

        const connectCult = await connectCultRepository.associate(connectCultoDatas)

        return connectCult
    } catch (error) {
        logger.error(`[CONNECT CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    createNewConnectCult,
    associateConnectCult
}
