import * as responsableController from '../../../src/controllers/responsableController.js'
import * as responsableService from '../../../src/services/responsableService.js'
import { responsableSchema } from '../../../src/validators/index.js'
import { RequestError } from '../../../src/errors/RequestError.js'

jest.mock('../../../src/services/responsableService.js')
jest.mock('../../../src/validators/index.js')

describe('Test Responsable Controller', () => {
    const requestMock = (body = {}, phone = null, query = {}) => {
        return {
            body,
            params: {
                phone
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

    test('Test get all responsables', async () => {
        const req = requestMock()
        const res = responseMock()

        responsableService.getAllResponsables.mockResolvedValue([{}])

        await responsableController.getAllResponsables(req, res)

        expect(responsableService.getAllResponsables).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to getting all responsables', async () => {
        const req = requestMock()
        const res = responseMock()

        responsableService.getAllResponsables.mockRejectedValue(new RequestError())

        await responsableController.getAllResponsables(req, res)

        expect(responsableService.getAllResponsables).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
    })

    test('Test get one responsable', async () => {
        const responsablePhone = 21987632109

        const req = requestMock(undefined, responsablePhone)
        const res = responseMock()

        responsableService.getOneResponsable.mockResolvedValue({})

        await responsableController.getOneResponsable(req, res)

        expect(responsableService.getOneResponsable).toHaveBeenCalledWith(responsablePhone)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to getting one responsable', async () => {
        const req = requestMock()
        const res = responseMock()

        // responsableService.getOneResponsable.mockRejectedValue(new RequestError())

        await responsableController.getOneResponsable(req, res)

        expect(responsableService.getOneResponsable).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(409)
    })

    test('Test create a responsable', async () => {
        const mockResponsableDatas = {
            nome: 'Test',
            telefone: '21987648908',
            grupoPais: true
        }

        const req = requestMock(mockResponsableDatas)
        const res = responseMock()

        responsableSchema.validate.mockResolvedValue({})
        responsableService.createResponsable.mockResolvedValue()

        await responsableController.createResponsable(req, res)

        expect(responsableSchema.validate).toHaveBeenCalledWith(mockResponsableDatas)
        expect(responsableService.createResponsable).toHaveBeenCalledWith(mockResponsableDatas)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to creating a responsable', async () => {
        const mockResponsableDatas = {}

        const req = requestMock(mockResponsableDatas)
        const res = responseMock()

        responsableSchema.validate.mockRejectedValue({})

        await responsableController.createResponsable(req, res)

        expect(responsableSchema.validate).toHaveBeenCalled()
        expect(responsableService.createResponsable).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
    })
})
