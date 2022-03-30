import {
    Connect,
    Responsavel,
    Culto
} from '../models/index.js'
import logger from '../config/logger.js'
import { RequestError } from '../errors/RequestError.js'

const getAll = async () => {
    try {
        logger.info('[CULT REPOSITORY] Getting all cults')

        const cults = await Culto.findAll({ include: [Connect] })

        return cults
    } catch (error) {
        logger.error(
            `[CULT REPOSITORY] Error to getting all cults >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}

const getOne = async (id) => {
    try {
        logger.info('[CULT REPOSITORY] Getting a cult')

        const cult = await Culto.findOne({
            where: { id }
        })

        return cult
    } catch (error) {
        logger.error(
            `[CULT REPOSITORY] Error to getting all cult >> ${JSON.stringify(error)}`
        )

        throw new RequestError()
    }
}

const create = async (datas) => {
    try {
        logger.info('[CULT REPOSITORY] Creating a cult')

        const cult = await Culto.create(datas)

        return cult
    } catch (error) {
        logger.error(
            `[CULT REPOSITORY] Error to creating cult >> ${JSON.stringify(error)}`
        )

        throw new RequestError(error.message)
    }
}

export {
    getAll,
    getOne,
    create
}
