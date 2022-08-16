import logger from '../config/logger.js'
import * as connectService from '../services/connectService.js'
import { RequestError } from '../errors/RequestError.js'

const getAllConnects = async (req, res) => {
    try {
        logger.info('[CONNECT CONTROLLER] Initializing to get all connectors')

        const response = await connectService.getAllConnects()

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error?.statusCode || 409

        res.status(statusCode).json({ error: error?.message })
    }
}

const getConnect = async (req, res) => {
    try {
        logger.info('[CONNECT CONTROLLER] Initializing to get one connect')

        const name = req.params?.name

        if (!name) throw new RequestError('Missing field')

        const response = await connectService.getConnect(name)

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error?.statusCode || 409

        res.status(statusCode).json({ error: error?.message })
    }
}

export {
    getAllConnects,
    getConnect
}
