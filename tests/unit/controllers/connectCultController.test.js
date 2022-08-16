import * as connectCultController from '../../../src/controllers/connectCultController.js'
import * as connectCultService from '../../../src/services/connectCultService.js'
import { connectCultoSchema, newConnectCultoSchema } from '../../../src/validators/index.js'
import { RequestError } from '../../../src/errors/RequestError.js'

jest.mock('../../../src/services/connectCultService.js')
jest.mock('../../../src/validators/index.js')

describe('Test ConnectCult Controller', () => {
    const requestMock = (body = {}) => {
        return {
            body
        }
    }

    const responseMock = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    }

    test('Test associate a connect', async () => {
        const body = {
            connectId: 1,
            cultoId: 1,
            numeroPulseira: 1234,
            observacoes: ''
        }

        const req = requestMock(body)
        const res = responseMock()

        const mockTreatedBody = {
            connectId: body.connectId,
            cultId: body.cultoId,
            braceletNumber: body.numeroPulseira,
            observations: body.observacoes
        }

        connectCultoSchema.validate.mockResolvedValue()
        connectCultService.associateConnectCult.mockResolvedValue({})

        await connectCultController.associateConnectCult(req, res)

        expect(connectCultoSchema.validate).toHaveBeenCalledWith(body)
        expect(connectCultService.associateConnectCult).toHaveBeenCalledWith(mockTreatedBody)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to associating a connect', async () => {
        const body = {
            cultId: 1,
            numeroPulseira: 1234,
            observacoes: ''
        }

        const req = requestMock(body)
        const res = responseMock()

        const mockTreatedBody = {
            connectId: body?.connectId,
            cultId: body?.cultId,
            braceletNumber: body?.numeroPulseira,
            observations: body?.observacoes
        }

        connectCultoSchema.validate.mockRejectedValue(new RequestError())

        await connectCultController.associateConnectCult(req, res)

        expect(connectCultoSchema.validate).toHaveBeenCalledWith(body)
        expect(connectCultService.associateConnectCult).not.toHaveBeenCalledWith(mockTreatedBody)
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(409)
    })
    test('Test create a connect connectCult', async () => {
        const body = {
            connect: {},
            cultoId: 1,
            numeroPulseira: 1234,
            observacoes: ''
        }

        const req = requestMock(body)
        const res = responseMock()

        const mockTreatedBody = {
            connect: body.connect,
            cultId: body.cultoId,
            braceletNumber: body.numeroPulseira,
            observations: body.observacoes
        }

        newConnectCultoSchema.validate.mockResolvedValue()
        connectCultService.createConnectCult.mockResolvedValue({})

        await connectCultController.createConnectCult(req, res)

        expect(newConnectCultoSchema.validate).toHaveBeenCalledWith(body)
        expect(connectCultService.createConnectCult).toHaveBeenCalledWith(mockTreatedBody)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to creating a connect connectCult', async () => {
        const body = {
            cultId: 1,
            numeroPulseira: 1234,
            observacoes: ''
        }

        const req = requestMock(body)
        const res = responseMock()

        const mockTreatedBody = {
            connectId: body?.connectId,
            cultId: body?.cultId,
            braceletNumber: body?.numeroPulseira,
            observations: body?.observacoes
        }

        newConnectCultoSchema.validate.mockRejectedValue(new RequestError())

        await connectCultController.createConnectCult(req, res)

        expect(newConnectCultoSchema.validate).toHaveBeenCalledWith(body)
        expect(connectCultService.createConnectCult).not.toHaveBeenCalledWith(mockTreatedBody)
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(409)
    })

})
