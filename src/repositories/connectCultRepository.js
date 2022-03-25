import { ConnectCulto, Connect, Culto } from '../models/index.js'
import logger from '../config/logger.js'
import { RequestError } from '../errors/RequestError.js'

const getAll = async () => {
    try {
        logger.info('[CONNECT REPOSITORY] Getting all connectors')

        const connectors = await ConnectCulto.findAll()

        return connectors
    } catch (error) {
        logger.error(
            `[CONNECT REPOSITORY] Error to getting all connectors >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}

const create = async ({ connectDatas, cultoDatas, numeroPulseira }) => {
    try {
        logger.info('[CONNECT REPOSITORY] Creating a connect cult')

        const pulseiraData = { through: { numeroPulseira } }

        const connectCult = await connectDatas.addCulto(cultoDatas, pulseiraData)

        return connectCult
    } catch (error) {
        logger.error(
            `[CONNECT REPOSITORY] Error to creating a connect cult >> ${JSON.stringify(error)}`
        )

        throw new RequestError(error.message)
    }
}

export {
    getAll,
    create
}
