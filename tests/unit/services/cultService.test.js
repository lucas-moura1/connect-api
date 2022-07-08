import * as cultRepository from '../../../src/repositories/cultRepository.js'
import * as cultService from '../../../src/services/cultService.js'

jest.mock('../../../src/repositories/cultRepository.js')

describe('Test Cult Service', () => {
    test('Test get all cults', async () => {
        cultRepository.getAll.mockResolvedValue([{}])

        await cultService.getAllCults()

        expect(cultRepository.getAll).toHaveBeenCalled()
    })

    test('Test error to getting all cults', async () => {
        cultRepository.getAll.mockRejectedValue(new Error())

        expect(cultService.getAllCults()).rejects.toThrow()
        expect(cultRepository.getAll).toHaveBeenCalled()
    })

    test('Test get one cult without relationship', async () => {
        const cultId = 2
        const query = {}

        cultRepository.getOne.mockResolvedValue([{}])

        await cultService.getCult(cultId, query)

        expect(cultRepository.getOne).toHaveBeenCalledWith(cultId, false)
    })

    test('Test get one cult with relationship', async () => {
        const cultId = 2
        const query = { relationship: 'true' }
        const mockResponseGetOne = { connects: [{}, {}], dataValues: {} }

        cultRepository.getOne.mockResolvedValue(mockResponseGetOne)

        const response = await cultService.getCult(cultId, query)

        expect(cultRepository.getOne).toHaveBeenCalledWith(cultId, true)
        expect(response.dataValues.amountConnect).toEqual(2)
    })

    test('Test error to getting one cult', async () => {
        cultRepository.getOne.mockRejectedValue(new Error())

        expect(cultService.getCult()).rejects.toThrow()
        expect(cultRepository.getOne).toHaveBeenCalled()
    })

    test('Test create a cult', async () => {
        const mockCurrencyDatas = {
            data: '2022-06-01',
            horario: '10h'
        }

        cultRepository.create.mockResolvedValue([{}])

        await cultService.createCult(mockCurrencyDatas)

        expect(cultRepository.create).toHaveBeenCalledWith(mockCurrencyDatas)
    })

    test('Test error to creating a cult', async () => {
        const mockCurrencyDatas = {
            data: '2022-06-01',
            horario: '10h'
        }

        cultRepository.create.mockRejectedValue(new Error())

        expect(cultService.createCult(mockCurrencyDatas)).rejects.toThrow()
        expect(cultRepository.create).toHaveBeenCalled()
    })
})
