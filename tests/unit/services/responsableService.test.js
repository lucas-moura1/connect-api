import * as responsableRepository from '../../../src/repositories/responsableRepository.js'
import * as responsableService from '../../../src/services/responsableService.js'

jest.mock('../../../src/repositories/responsableRepository.js')

describe('Test Responsable Service', () => {
    test('Test get all responsables', async () => {
        responsableRepository.getAll.mockResolvedValue([{}])

        const response = await responsableService.getAllResponsables()

        expect(responsableRepository.getAll).toHaveBeenCalled()
        expect(response).not.toBeNull()
    })

    test('Test error to getting all responsables', async () => {
        responsableRepository.getAll.mockRejectedValue(new Error())

        expect(responsableService.getAllResponsables()).rejects.toThrow()
        expect(responsableRepository.getAll).toHaveBeenCalled()
    })

    test('Test get one responsable', async () => {
        const responsableId = 2

        responsableRepository.getOne.mockResolvedValue([{}])

        const response = await responsableService.getOneResponsable(responsableId)

        expect(responsableRepository.getOne).toHaveBeenCalledWith(responsableId)
        expect(response).not.toBeNull()
    })

    test('Test error to getting one responsable', async () => {
        responsableRepository.getOne.mockRejectedValue(new Error())

        expect(responsableService.getOneResponsable()).rejects.toThrow()
        expect(responsableRepository.getOne).toHaveBeenCalled()
    })

    test('Test create a responsable', async () => {
        const mockResponsableDatas = {
            nome: 'Test Testinho',
            telefone: '21987654321',
            grupoPais: true
        }

        responsableRepository.create.mockResolvedValue([{}])

        await responsableService.createResponsable(mockResponsableDatas)

        expect(responsableRepository.create).toHaveBeenCalledWith(mockResponsableDatas)
    })

    test('Test error to creating a responsable', async () => {
        const mockResponsableDatas = {
            nome: 'Test Testinho',
            grupoPais: true
        }

        responsableRepository.create.mockRejectedValue(new Error())

        expect(responsableService.createResponsable(mockResponsableDatas)).rejects.toThrow()
        expect(responsableRepository.create).toHaveBeenCalled()
    })
})
