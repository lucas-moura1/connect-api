import logger from '../config/logger.js'
import * as connectCultService from '../services/connectCultService.js'
import { connectCultoSchema } from '../validators/index.js'

const associateConnectCult = async (req, res) => {
    try {
        logger.info('[CONNECT CONTROLLER] Initializing to associate connect with cult')

        const body = req.body

        await connectCultoSchema.validate(body)

        const response = await connectCultService.associateConnectCult(body)

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

export {
    associateConnectCult
}
