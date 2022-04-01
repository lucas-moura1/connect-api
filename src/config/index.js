const {
    NODE_ENV,
    PORT,
    CLEARDB_DATABASE_URL
} = process.env

const IS_TEST = NODE_ENV === 'test'

const LOGGER_LEVEL = 'debug'

export {
    IS_TEST,
    LOGGER_LEVEL,
    PORT,
    CLEARDB_DATABASE_URL
}
