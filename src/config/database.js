import {
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST
} from './index.js'

export default {
    database: MYSQL_DATABASE || 'connect_db',
    host: MYSQL_HOST || 'localhost',
    username: MYSQL_USER || 'root',
    password: MYSQL_PASSWORD || 'admin',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
    }
}
