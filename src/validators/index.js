import * as yup from 'yup'

const telefoneSchema = yup
    .string()
    .required()
    .min(11)

const responsableSchema = yup.object().shape({
    nome: yup
        .string()
        .required()
        .min(2),
    telefone: telefoneSchema,
    grupoPais: yup
        .boolean()
        .required()
})

const connectSchema = yup.object().shape({
    nome: yup
        .string()
        .required()
        .min(2),
    dataNascimento: yup
        .string()
        .matches(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/)
        .required(),
    telefone: telefoneSchema,
    responsavels: yup.array().of(responsableSchema)
})

const cultSchema = yup.object().shape({
    data: yup
        .string()
        .matches(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/)
        .required(),
    horario: yup
        .string()
        .required()
        .length(3)
        .matches(/(10h|18h|20h)/)
})

const connectCultoSchema = yup.object().shape({
    connect: connectSchema,
    cultoId: yup
        .number()
        .required()
        .positive()
        .integer(),
    numeroPulseira: yup
        .number()
        .required()
        .positive()
        .integer(),
    observacoes: yup
        .string()
        .notRequired()
})

export {
    cultSchema,
    connectSchema,
    responsableSchema,
    connectCultoSchema
}
