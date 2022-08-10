import logger from '../config/logger.js'
import * as connectCultService from '../services/connectCultService.js'
import { connectCultoSchema, newConnectCultoSchema } from '../validators/index.js'

const associateConnectCult = async (req, res) => {
    try {
        logger.info('[CONNECT CULT CONTROLLER] Initializing to associate connect with cult')

        const body = req.body

        await connectCultoSchema.validate(body)

        const treatedBody = {
            connectId: body.connectId,
            cultId: body.cultoId,
            braceletNumber: body.numeroPulseira,
            observations: body?.observacoes
        }

        const response = await connectCultService.associateConnectCult(treatedBody)

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CULT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

const createConnectCult = async (req, res) => {
    try {
        logger.info('[CONNECT CULT CONTROLLER] Initializing to save new connect')

        const body = req.body

        await newConnectCultoSchema.validate(body)

        const treatedBody = {
            connect: body.connect,
            cultId: body.cultoId,
            braceletNumber: body.numeroPulseira,
            observations: body?.observacoes
        }

        const response = await connectCultService.createConnectCult(treatedBody)

        res.json(response)
    } catch (error) {
        logger.error(`[CONNECT CULT CONTROLLER] Error >> ${JSON.stringify(error)}`)

        const statusCode = error.statusCode || 409

        res.status(statusCode).json({ error: error.message })
    }
}

export {
    associateConnectCult,
    createConnectCult
}
