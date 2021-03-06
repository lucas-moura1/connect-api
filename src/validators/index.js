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
        .matches(/(1\d|2\d)\d\d[- /.](0[\d]|1[012])[- /.](0[\d]|[12][\d]|3[01])/)
        .required(),
    telefone: telefoneSchema.notRequired(),
    responsavels: yup.array().of(responsableSchema)
})

const cultSchema = yup.object().shape({
    data: yup
        .string()
        .matches(/(1\d|2\d)\d\d[- /.](0[\d]|1[012])[- /.](0[\d]|[12][\d]|3[01])/, 'Data Format is not correct')
        .required(),
    horario: yup
        .string()
        .required()
        .length(3)
        .matches(/(10h|18h|20h)/, "Horario field should be '10h', '18h' or '20h'")
})

const newConnectCultoSchema = yup.object().shape({
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

const connectCultoSchema = yup.object().shape({
    connectId: yup
        .number()
        .required()
        .positive()
        .integer(),
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
    responsableSchema,
    newConnectCultoSchema,
    connectCultoSchema
}
