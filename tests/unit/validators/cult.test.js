import { cultSchema } from '../../../src/validators/index.js'

describe('Test validate cult Schema', () => {
    test('Test create cult with success ', async () => {
        const body = {
            data: '2022-06-01',
            horario: '10h'
        }

        const responseValidateSchema = await cultSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['data'])
        await expect(responseValidateSchema).toHaveProperty(['horario'])
    })

    test('Test create cult with error on data format', async () => {
        const body = {
            data: '01-06-2022',
            horario: '10h'
        }

        await expect(cultSchema.validate(body))
            .rejects.toThrow('Data Format is not correct')
    })

    test('Test create cult with error on horario field', async () => {
        const body = {
            data: '2022-06-01',
            horario: '17h'
        }

        await expect(cultSchema.validate(body))
            .rejects.toThrow("Horario field should be '10h', '18h' or '20h'")
    })
})
