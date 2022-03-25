import logger from '../config/logger.js'
import * as connectService from '../services/connectService.js'
import { connectCultoSchema } from '../validators/index.js'

const getAllConnectors = async (req, res) => {
    try {
        logger.info('[CONNECT CONTROLLER] Initializing to get all connectors')

        const response = await connectService.getAllConnectors()

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

const createConnect = async (req, res) => {
    try {
        logger.info('[CONNECT CONTROLLER] Initializing to save new connect')

        const body = req.body

        await connectCultoSchema.validate(body)

        const response = await connectService.createConnect(body)

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

export {
    getAllConnectors,
    createConnect
}
