import logger from '../config/logger.js'
import * as connectCultRepository from '../repositories/connectCultRepository.js'
import * as cultRepository from '../repositories/cultRepository.js'
import * as connectRepository from '../repositories/connectRepository.js'
import * as connectService from './connectService.js'
import { RequestError } from '../errors/RequestError.js'

const createConnectCult = async (payload) => {
    try {
        const {
            connect,
            cultId,
            braceletNumber,
            observations
        } = payload

        const cultDatas = await cultRepository.getOne(cultId)

        if (!cultDatas) throw new RequestError('Cult Not Found', 404)

        const connectDatas = await connectService.createConnect(connect)

        const connectCultoDatas = {
            connectDatas,
            cultDatas,
            braceletNumber,
            observations
        }

        const connectCult = await connectCultRepository.associate(connectCultoDatas)

        return connectCult
    } catch (error) {
        logger.error(`[CONNECT CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const associateConnectCult = async ({
    connectId,
    cultId,
    braceletNumber,
    observations = ''
}) => {
    try {
        const promisseArray = [
            connectRepository.getById(connectId),
            cultRepository.getOne(cultId)
        ]
        const [connectDatas, cultDatas] = await Promise.all(promisseArray)

        if (!cultDatas || !connectDatas) throw new RequestError('Not Found', 404)

        const connectCultoDatas = {
            connectDatas,
            cultDatas,
            braceletNumber,
            observations
        }

        const connectCult = await connectCultRepository.associate(connectCultoDatas)

        return connectCult
    } catch (error) {
        logger.error(`[CONNECT CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    createConnectCult,
    associateConnectCult
}
