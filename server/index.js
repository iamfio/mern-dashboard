import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoutes from './routes/client'
import generalRoutes from './routes/general'
import managementRoutes from './routes/management'
import salesRoutes from './routes/sales'

// Data Imports
import User from './models/User'
import Product from './models/Product'
import ProductStat from './models/ProductStat'
import Transaction from './models/Transaction'
import { dataUser, dataProduct, dataProductStat, dataTransaction } from './data/index'

// CONFIGS
dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// ROUTES
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

// MONGOOOSE
const PORT = process.env.PORT || 9000
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    )

    // ONLY ADD ONE TIME
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
  })
  .catch((error) => console.log(`${error}: MONGOOSE CONNECTION ERRROR`))
