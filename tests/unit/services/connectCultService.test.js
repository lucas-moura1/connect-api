import * as connectRepository from '../../../src/repositories/connectRepository.js'
import * as connectCultRepository from '../../../src/repositories/connectCultRepository.js'
import * as cultRepository from '../../../src/repositories/cultRepository.js'
import * as connectCultService from '../../../src/services/connectCultService.js'
import * as connectService from '../../../src/services/connectService.js'

jest.mock('../../../src/repositories/connectRepository.js')
jest.mock('../../../src/repositories/connectCultRepository.js')
jest.mock('../../../src/repositories/cultRepository.js')
jest.mock('../../../src/services/connectService.js')

describe('Test Connect Cult Service', () => {
    test('Test create a connect cult', async () => {
        const mockDatas = {
            cultId: 2,
            braceletNumber: 1290,
            connect: {
                nome: 'Miguel',
                dataNascimento: '2012-06-09',
                responsavels: [{
                    nome: 'Alberto',
                    telefone: '21982557890',
                    grupoPais: true
                }]
            },
            observations: ''
        }
        const mockConnectCultDatas = {
            connectDatas: {},
            cultDatas: {},
            braceletNumber: mockDatas.braceletNumber,
            observations: ''
        }

        connectService.createConnect.mockResolvedValue({})
        cultRepository.getOne.mockResolvedValue({})
        connectCultRepository.associate.mockResolvedValue({})

        const response = await connectCultService.createConnectCult(mockDatas)

        expect(connectService.createConnect).toHaveBeenCalledWith(mockDatas.connect)
        expect(cultRepository.getOne).toHaveBeenCalledWith(mockDatas.cultId)
        expect(connectCultRepository.associate).toHaveBeenCalledWith(mockConnectCultDatas)
        expect(response).not.toBeNull()
    })

    test('Test error to creating a connect cult', async () => {
        const mockDatas = {
            cultId: 2,
            braceletNumber: 1290
        }

        cultRepository.getOne.mockResolvedValue(null)

        expect(connectCultService.createConnectCult(mockDatas)).rejects.toThrow()
        expect(cultRepository.getOne).toHaveBeenCalled()
        expect(connectService.createConnect).not.toHaveBeenCalled()
    })

    test('Test associate a connect', async () => {
        const mockDatas = {
            connectId: 1,
            cultId: 1,
            braceletNumber: 1234,
            observations: ''
        }
        const mockConnectCultDatas = {
            connectDatas: {},
            cultDatas: {},
            braceletNumber: mockDatas.braceletNumber,
            observations: ''
        }

        connectRepository.getById.mockResolvedValue({})
        cultRepository.getOne.mockResolvedValue({})
        connectCultRepository.associate.mockResolvedValue({})

        const response = await connectCultService.associateConnectCult(mockDatas)

        expect(cultRepository.getOne).toHaveBeenCalledWith(mockDatas.cultId)
        expect(connectRepository.getById).toHaveBeenCalledWith(mockDatas.connectId)
        expect(connectCultRepository.associate).toHaveBeenCalledWith(mockConnectCultDatas)
        expect(response).not.toBeNull()
    })

    test('Test error to associating a connect', async () => {
        const mockDatas = {
            connectId: 1,
            cultId: 1,
            braceletNumber: 1234,
            observations: ''
        }

        connectRepository.getById.mockResolvedValue(null)
        cultRepository.getOne.mockResolvedValue({})

        expect(connectCultService.associateConnectCult(mockDatas)).rejects.toThrow()
        expect(cultRepository.getOne).toHaveBeenCalledWith(mockDatas.cultId)
        expect(connectRepository.getById).toHaveBeenCalledWith(mockDatas.connectId)
    })
})
