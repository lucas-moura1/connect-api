import * as connectController from '../../../src/controllers/connectController.js'
import * as connectService from '../../../src/services/connectService.js'
import { connectSchema } from '../../../src/validators/index.js'
import { RequestError } from '../../../src/errors/RequestError.js'

jest.mock('../../../src/services/connectService.js')
jest.mock('../../../src/validators/index.js')

describe('Test Connect Controller', () => {
    const requestMock = (body = {}, name = null, query = {}) => {
        return {
            body,
            params: {
                name
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

    test('Test get all connects', async () => {
        const req = requestMock()
        const res = responseMock()

        connectService.getAllConnects.mockResolvedValue([{}])

        await connectController.getAllConnects(req, res)

        expect(connectService.getAllConnects).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to getting all connects', async () => {
        const req = requestMock()
        const res = responseMock()

        connectService.getAllConnects.mockRejectedValue(new RequestError())

        await connectController.getAllConnects(req, res)

        expect(connectService.getAllConnects).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
    })

    test('Test unknow error to getting all connects', async () => {
        const req = requestMock()
        const res = responseMock()

        connectService.getAllConnects.mockRejectedValue()

        await connectController.getAllConnects(req, res)

        expect(connectService.getAllConnects).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
    })

    test('Test get one connect', async () => {
        const connectName = 'Test'

        const req = requestMock(undefined, connectName)
        const res = responseMock()

        connectService.getConnect.mockResolvedValue([{}])

        await connectController.getConnect(req, res)

        expect(connectService.getConnect).toHaveBeenCalledWith(connectName)
        expect(res.json).toHaveBeenCalled()
    })

    test('Test error to getting one connect', async () => {
        const req = requestMock()
        const res = responseMock()

        connectService.getConnect.mockRejectedValue(new RequestError())

        await connectController.getConnect(req, res)

        expect(connectService.getConnect).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(409)
    })

    test('Test unknow error to getting one connect', async () => {
        const connectName = 'Test'

        const req = requestMock(undefined, connectName)
        const res = responseMock()

        connectService.getConnect.mockRejectedValue()

        await connectController.getConnect(req, res)

        expect(connectService.getConnect).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(409)
    })
})
