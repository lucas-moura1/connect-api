import * as cultController from '../../../src/controllers/cultController.js'
import * as cultService from '../../../src/services/cultService.js'
import { cultSchema } from '../../../src/validators/index.js'
import { RequestError } from '../../../src/errors/RequestError.js'

jest.mock('../../../src/services/cultService.js')
jest.mock('../../../src/validators/index.js')

describe('Test Cult Controller', () => {
    const requestMock = (body = {}, id = null, query = {}) => {
        return {
            body,
            params: {
                id
            },
            query
        }
    }

    const responseMock = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    }

    test('Test get all cults', async () => {
        const req = requestMock()
        const res = responseMock()

        cultService.getAllCults.mockResolvedValue([{}])

        await cultController.getAllCult(req, res)

        expect(cultService.getAllCults).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to getting all cults', async () => {
        const req = requestMock()
        const res = responseMock()

        cultService.getAllCults.mockRejectedValue(new RequestError())

        await cultController.getAllCult(req, res)

        expect(cultService.getAllCults).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
    })

    test('Test get one cult without relationship', async () => {
        const cultId = 2

        const req = requestMock(undefined, cultId)
        const res = responseMock()

        cultService.getCult.mockResolvedValue({})

        await cultController.getCult(req, res)

        expect(cultService.getCult).toHaveBeenCalledWith(cultId, {})
        expect(res.json).toHaveBeenCalled()
    })

    test('Test get one cult with relationship', async () => {
        const cultId = 2
        const query = { relationship: 1 }

        const req = requestMock(undefined, cultId, query)
        const res = responseMock()

        cultService.getCult.mockResolvedValue({})

        await cultController.getCult(req, res)

        expect(cultService.getCult).toHaveBeenCalledWith(cultId, query)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to getting one cult', async () => {
        const req = requestMock()
        const res = responseMock()

        cultService.getCult.mockRejectedValue(new RequestError())

        await cultController.getCult(req, res)

        expect(cultService.getCult).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(409)
    })

    test('Test create a cult', async () => {
        const mockCultDatas = {
            data: '2022-06-01',
            horario: '10h'
        }

        const req = requestMock(mockCultDatas)
        const res = responseMock()

        cultSchema.validate.mockResolvedValue({})
        cultService.createCult.mockResolvedValue()

        await cultController.createCult(req, res)

        expect(cultSchema.validate).toHaveBeenCalledWith(mockCultDatas)
        expect(cultService.createCult).toHaveBeenCalledWith(mockCultDatas)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to creating a cult', async () => {
        const mockCultDatas = {}

        const req = requestMock(mockCultDatas)
        const res = responseMock()

        cultSchema.validate.mockRejectedValue({})

        await cultController.createCult(req, res)

        expect(cultSchema.validate).toHaveBeenCalled()
        expect(cultService.createCult).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
    })
})
