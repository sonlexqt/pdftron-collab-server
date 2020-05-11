import mongoose from 'mongoose'

const annotationSchema = new mongoose.Schema({
  annotationId: {
    type: String,
    required: true,
  },
  documentId: {
    type: String,
    required: true,
  },
  xfdf: {
    type: String,
    required: true,
  },
})

export default mongoose.model('annotations', annotationSchema)
