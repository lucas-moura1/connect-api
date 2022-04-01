import {
    CLEARDB_DATABASE_URL
} from './index.js'

const databaseUrl = CLEARDB_DATABASE_URL || 'mysql://root:admin@localhost:3306/connect_db'

export default { url: databaseUrl }
