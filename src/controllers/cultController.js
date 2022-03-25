import logger from '../config/logger.js'
import * as cultService from '../services/cultService.js'
import { cultSchema } from '../validators/index.js'

const getAllCult = async (req, res) => {
    try {
        logger.info('[CULT CONTROLLER] Initializing to get all cults')

        const response = await cultService.getAllCults()

        res.json(response)
    } catch (error) {
        logger.error(`[CULT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

const createCult = async (req, res) => {
    try {
        logger.info('[CULT CONTROLLER] Initializing to save new cult')

        const body = req.body

        await cultSchema.validate(body)

        const response = await cultService.createCult(body)

        res.json(response)
    } catch (error) {
        logger.error(`[CULT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

export {
    getAllCult,
    createCult
}
