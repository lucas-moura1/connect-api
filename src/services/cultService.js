import logger from '../config/logger.js'
import * as cultRepository from '../repositories/cultRepository.js'

const getAllCults = async () => {
    try {
        logger.info('[CULT SERVICE] Process to get all cults')

        const cults = await cultRepository.getAll()

        return cults
    } catch (error) {
        logger.error(`[CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const getCult = async (cultId, query) => {
    try {
        logger.info(`[CULT SERVICE] Process to get cult with id: ${cultId}`)

        const hasRelationship = query?.relationship === '1' || query?.relationship === 'true'

        const cult = await cultRepository.getOne(cultId, hasRelationship)

        if (hasRelationship && cult) cult.dataValues.amountConnect = cult.connects.length

        return cult
    } catch (error) {
        logger.error(`[CULT SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const createCult = async (cultDatas) => {
    try {
        logger.info('[CULT SERVICE] Process to create a cult')

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
