import * as connectRepository from '../../../src/repositories/connectRepository.js'
import * as connectService from '../../../src/services/connectService.js'

jest.mock('../../../src/repositories/connectRepository.js')

describe('Test Connect Service', () => {
    test('Test get all connects', async () => {
        connectRepository.getAll.mockResolvedValue([{}])

        const response = await connectService.getAllConnects()

        expect(connectRepository.getAll).toHaveBeenCalled()
        expect(response).not.toBeNull()
    })

    test('Test error to getting all connects', async () => {
        connectRepository.getAll.mockRejectedValue(new Error())

        expect(connectService.getAllConnects()).rejects.toThrow()
        expect(connectRepository.getAll).toHaveBeenCalled()
    })

    test('Test get one connect', async () => {
        const connectName = 'Test'

        connectRepository.getOne.mockResolvedValue([{}])

        const response = await connectService.getOneConnect(connectName)

        expect(connectRepository.getOne).toHaveBeenCalledWith(connectName)
        expect(response).not.toBeNull()
    })

    test('Test error to getting one connect', async () => {
        connectRepository.getOne.mockRejectedValue(new Error())

        expect(connectService.getOneConnect()).rejects.toThrow()
        expect(connectRepository.getOne).toHaveBeenCalled()
    })

    test('Test create a connect with relationship', async () => {
        const mockConnectDatas = {
            nome: 'Miguel',
            dataNascimento: '2012-06-09',
            responsavels: [{
                nome: 'Alberto',
                telefone: '21982557890',
                grupoPais: true
            }]
        }

        connectRepository.create.mockResolvedValue([{}])

        const response = await connectService.createConnect(mockConnectDatas)

        expect(connectRepository.create).toHaveBeenCalledWith(mockConnectDatas, true)
        expect(response).not.toBeNull()
    })

    test('Test create a connect without relationship', async () => {
        const mockConnectDatas = {
            nome: 'Miguel',
            dataNascimento: '2012-06-09'
        }

        connectRepository.create.mockResolvedValue([{}])

        const response = await connectService.createConnect(mockConnectDatas)

        expect(connectRepository.create).toHaveBeenCalledWith(mockConnectDatas, false)
        expect(response).not.toBeNull()
    })

    test('Test error to creating a connect', async () => {
        const mockConnectDatas = {
            nome: 'Test Testinho'
        }

        connectRepository.create.mockRejectedValue(new Error())

        expect(connectService.createConnect(mockConnectDatas)).rejects.toThrow()
        expect(connectRepository.create).toHaveBeenCalled()
    })
})
