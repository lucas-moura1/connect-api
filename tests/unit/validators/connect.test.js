import { connectCultoSchema, newConnectCultoSchema } from '../../../src/validators/index.js'

describe('Test validate connect Schema', () => {
    test('Test associate connect with success ', async () => {
        const body = {
            cultoId: 2,
            numeroPulseira: 1360,
            connectId: 3,
            observacoes: ''
        }

        const responseValidateSchema = await connectCultoSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['cultoId'])
        await expect(responseValidateSchema).toHaveProperty(['numeroPulseira'])
        await expect(responseValidateSchema).toHaveProperty(['connectId'])
        await expect(responseValidateSchema).toHaveProperty(['observacoes'])
    })

    test('Test associate connect with error on data format', async () => {
        const body = {
            cultoId: 2,
            numeroPulseira: 1360
        }

        await expect(connectCultoSchema.validate(body))
            .rejects.toThrow('connectId is a required field')
    })

    test('Test create connect with success ', async () => {
        const body = {
            cultoId: 2,
            numeroPulseira: 1290,
            connect: {
                nome: 'Miguel',
                dataNascimento: '2012-06-09',
                responsavels: [{
                    nome: 'Alberto',
                    telefone: '21982557890',
                    grupoPais: true
                }]
            },
            observacoes: ''
        }

        const responseValidateSchema = await newConnectCultoSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['cultoId'])
        await expect(responseValidateSchema).toHaveProperty(['numeroPulseira'])
        await expect(responseValidateSchema).toHaveProperty(['connect'])
        await expect(responseValidateSchema).toHaveProperty(['observacoes'])
    })

    test('Test create connect with error on data format', async () => {
        const body = {
            cultoId: 2,
            connect: {
                nome: 'Miguel',
                dataNascimento: '2012-06-09',
                responsavels: [{
                    nome: 'Alberto',
                    telefone: '21982557890',
                    grupoPais: true
                }]
            },
            observacoes: ''
        }

        await expect(newConnectCultoSchema.validate(body))
            .rejects.toThrow('numeroPulseira is a required field')
    })
})
