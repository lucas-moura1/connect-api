import app from './config/express.js'
import { PORT } from './config/index.js'

const port = PORT || 3333

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
