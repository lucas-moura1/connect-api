import express from 'express'
import * as cultController from '../controllers/cultController.js'
import * as connectController from '../controllers/connectController.js'
import * as responsableController from '../controllers/responsableController.js'

const route = express.Router()

route.get('/health', (req, res) => {
    res.json({ status: 'UP!' })
})

route.get('/cult', cultController.getAllCult)
route.post('/cult', cultController.createCult)
route.get('/connect', connectController.getAllConnectors)
route.post('/connect', connectController.createConnect)
route.post('/responsable', responsableController.createConnect)

export default route
