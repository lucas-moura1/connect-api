import express from 'express'
import * as cultController from '../controllers/cultController.js'
import * as connectController from '../controllers/connectController.js'

const route = express.Router()

route.get('/health', (req, res) => {
    res.json({ status: 'UP!' })
})

route.get('/cult', cultController.getAllCult)
route.post('/cult', cultController.createCult)
route.post('/connect', connectController.createConnect)

export default route
