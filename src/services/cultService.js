import logger from '../config/logger.js'
import * as cultRepository from '../repositories/cultRepository.js'
import { RequestError } from '../errors/RequestError.js'
import * as responsableService from './responsableService.js'

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
    createCult
}
