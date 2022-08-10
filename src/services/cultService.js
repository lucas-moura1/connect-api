import logger from '../config/logger.js'
import * as cultRepository from '../repositories/cultRepository.js'
import { RequestError } from '../errors/RequestError.js'

const getAllCults = async () => {
    try {
        const cults = await cultRepository.getAll()

        return cults
    } catch (error) {
        logger.error(`[CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const getCult = async (cultId, query) => {
    try {
        const hasRelationship = query?.relationship === '1' || query?.relationship === 'true'

        const cult = await cultRepository.getOne(cultId, hasRelationship)

        if (!cult) throw new RequestError('Not Found', 404)

        if (hasRelationship) cult.dataValues.amountConnect = cult.connects.length

        return cult
    } catch (error) {
        logger.error(`[CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const createCult = async (cultDatas) => {
    try {
        const cult = await cultRepository.create(cultDatas)

        return cult
    } catch (error) {
        logger.error(`[CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    getAllCults,
    getCult,
    createCult
}
