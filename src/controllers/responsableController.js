import logger from '../config/logger.js'
import * as responsableService from '../services/responsableService.js'
import { responsableSchema } from '../validators/index.js'
import { RequestError } from '../errors/RequestError.js'

const getAllResponsables = async (req, res) => {
    try {
        logger.info('[RESPONSABLE CONTROLLER] Initializing to get all responsables')

        const response = await responsableService.getAllResponsables()

        res.json(response)
    } catch (error) {
        logger.error(`[RESPONSABLE CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

const getOneResponsable = async (req, res) => {
    try {
        logger.info('[CONNECT CONTROLLER] Initializing to get one responsable')

        const phone = req.params?.phone

        if (!phone) throw new RequestError('Missing field')

        const response = await responsableService.getOneResponsable(phone)

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

const createResponsable = async (req, res) => {
    try {
        logger.info('[RESPONSABLE CONTROLLER] Initializing to save new responsable')

        const body = req.body

        await responsableSchema.validate(body)

        const response = await responsableService.createResponsable(body)

        res.json(response)
    } catch (error) {
        logger.error(`[RESPONSABLE CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

export {
    createResponsable,
    getAllResponsables,
    getOneResponsable
}
