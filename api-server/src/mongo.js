import mongoose from 'mongoose'

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err))
