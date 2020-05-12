import express from 'express'
import logger from 'morgan'
import http from 'http'
import bodyParser from 'body-parser'
import Annotations from './models/Annotations'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json())

const server = http.createServer(app)
const port = process.env.PORT || 3000
server.listen(port)
server.on('listening', () => {
  console.log(`API-SERVER listening on port ${port}`)
})

app.get('/', (req, res) => res.send('api-server'))

app.get('/api/annotations/', async (req, res) => {
  const { documentId } = req.query
  const annotations = await Annotations.find({ documentId })
  res.send(annotations)
})

app.post('/api/annotations', async (req, res) => {
  const { action, xfdf, annotationId, documentId } = req.body
  switch (action) {
    case 'add': {
      await Annotations.create({
        xfdf,
        annotationId,
        documentId,
      })
      break
    }
    case 'modify':{
      try{
        let doc = await Annotations.findOneAndUpdate({annotationId: annotationId}, {xfdf:xfdf})
        console.log(doc)
      }catch(err) {
        console.log(err)
      }
      
       break
    }
    case 'delete':{
      
      await Annotations.findOneAndRemove({annotationId: annotationId})
      break
    }
      
    default:
      break
  }
})
