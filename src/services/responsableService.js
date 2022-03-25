import logger from '../config/logger.js'
import * as responsableRepository from '../repositories/responsableRepository.js'
import { RequestError } from '../errors/RequestError.js'

const getAllResponsables = async () => {
    try {
        logger.info('[RESPONSABLE SERVICE] Process to get all responsables')

        const responsables = await responsableRepository.getAll()

        return responsables
    } catch (error) {
        logger.error(`[RESPONSABLE SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

const createResponsable = async (responsableDatas) => {
    try {
        logger.info('[RESPONSABLE SERVICE] Process to create a responsable')

        const responsable = await responsableRepository.create(responsableDatas)

        return responsable
    } catch (error) {
        logger.error(`[RESPONSABLE SERVICE] Error >> ${JSON.stringify(error)}`)

        throw error
    }
}

export {
    getAllResponsables,
    createResponsable
}
