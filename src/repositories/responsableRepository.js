import { Responsavel, Connect } from '../models/index.js'
import logger from '../config/logger.js'
import { RequestError } from '../errors/RequestError.js'

const getAll = async () => {
    try {
        logger.info('[RESPONSABLE REPOSITORY] Getting all responsables')

        const responsaveis = await Responsavel.findAll()

        return responsaveis
    } catch (error) {
        logger.error(
            `[RESPONSABLE REPOSITORY] Error to getting all responsables >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}

const getOne = async (phone) => {
    try {
        logger.info('[RESPONSABLE REPOSITORY] Getting a responsable')

        const responsable = await Responsavel.findOne({
            where: { telefone: phone },
            include: Connect
        })

        return responsable
    } catch (error) {
        logger.error(
            `[RESPONSABLE REPOSITORY] Error to getting a responsable >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}

const create = async (datas) => {
    try {
        logger.info('[RESPONSABLE REPOSITORY] Creating a responsable')

        const [responsable, created] = await Responsavel.findOrCreate({
            where: datas
        })

        if (!created) logger.info('[CULT REPOSITORY] Responsable already created')

        return responsable
    } catch (error) {
        logger.error(
            `[RESPONSABLE REPOSITORY] Error create a responsable >> ${JSON.stringify(error)}`
        )

        throw new RequestError(error.message)
    }
}

export {
    getAll,
    getOne,
    create
}
