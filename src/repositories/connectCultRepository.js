import logger from '../config/logger.js'
import { RequestError } from '../errors/RequestError.js'

const associate = async ({
    connectDatas,
    cultDatas: cultoDatas,
    braceletNumber: numeroPulseira,
    observations: observacoes
}) => {
    try {
        logger.info('[CONNECT REPOSITORY] Creating a connect cult')

        const throughDatas = { through: { numeroPulseira, observacoes } }

        const connectCult = await connectDatas.addCulto(cultoDatas, throughDatas)

        return connectCult
    } catch (error) {
        logger.error(
            `[CONNECT REPOSITORY] Error to creating a connect cult >> ${error}`
        )

        throw new RequestError(error.message)
    }
}

export {
    associate
}
