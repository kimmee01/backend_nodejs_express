import express from "express"
import bodyParser from 'body-parser'  // get body JSON
import ApiRouter from './api/index.js'
import cors from 'cors'

// config server
import config from './config.js'
import DB from './lib/db.js'
// import { MqttClient } from './lib/mqtt.js'


const app = express()
const port = 3000


const db = new DB(config.db)
// const wsMqtt = MqttClient('ws', config.wsMqtt)


app.use(express.static('public'))
app.use(cors())



// config req to send to any ctrl to use it 
app.use((req, res, next) => {
  req.config = config
  req.db = db
  // req.wsMqtt = wsMqtt
  req.ipText = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
  next()
})



app.use('/api', bodyParser.json(), ApiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})