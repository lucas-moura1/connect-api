import { responsableSchema } from '../../../src/validators/index.js'

describe('Test validate responsable Schema', () => {
    test('Test create responsable with success ', async () => {
        const body = {
            nome: 'Lucas',
            telefone: '21987648908',
            grupoPais: true
        }

        const responseValidateSchema = await responsableSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['nome'])
        await expect(responseValidateSchema).toHaveProperty(['telefone'])
        await expect(responseValidateSchema).toHaveProperty(['grupoPais'])
    })

    test('Test create responsable with error on data format', async () => {
        const body = {
            nome: 'Lucas',
            grupoPais: true
        }

        await expect(responsableSchema.validate(body))
            .rejects.toThrow('telefone is a required field')
    })

    test('Test create responsable with error on telefone field format', async () => {
        const body = {
            nome: 'Lucas',
            telefone: '21987648',
            grupoPais: true
        }

        await expect(responsableSchema.validate(body))
            .rejects.toThrow('telefone must be at least 11 characters')
    })
})
