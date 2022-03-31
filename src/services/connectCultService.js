import logger from '../config/logger.js'
import * as connectCultRepository from '../repositories/connectCultRepository.js'
import * as cultRepository from '../repositories/cultRepository.js'
import { RequestError } from '../errors/RequestError.js'

const createConnectCult = async (connectDatas, cultoId, { numeroPulseira, observacoes }) => {
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

        const connectCult = await connectCultRepository.create(connectCultoDatas)

        return connectCult
    } catch (error) {
        logger.error(`[CONNECT CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    createConnectCult
}
