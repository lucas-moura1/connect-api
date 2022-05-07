import express from 'express'
import * as cultController from '../controllers/cultController.js'
import * as connectController from '../controllers/connectController.js'
import * as responsableController from '../controllers/responsableController.js'
import * as connectCultController from '../controllers/connectCultController.js'

const route = express.Router()

route.get('/health', (req, res) => {
    res.json({ status: 'UP!' })
})

route.get('/cult', cultController.getAllCult)
route.get('/cult/:id', cultController.getCult)
route.post('/cult', cultController.createCult)

route.get('/connect', connectController.getAllConnectors)
route.get('/connect/:name', connectController.getOneConnect)
route.post('/connect', connectController.createConnect)

route.post('/connectCult', connectCultController.associateConnectCult)

route.post('/responsable', responsableController.createResponsable)

export default route
