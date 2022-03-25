const {
    NODE_ENV,
    PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST
} = process.env

const IS_TEST = NODE_ENV === 'test'

const LOGGER_LEVEL = 'debug'

export {
    IS_TEST,
    LOGGER_LEVEL,
    PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST
}
