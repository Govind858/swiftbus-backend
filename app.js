const express = require('express')
const app = express();
const cors = require('cors')
const port = 3000
const router = require('./User/Router/userRouter');
const busOperatorRouter = require('./BusOperator/Router/busRouter')
const tripsRouter = require('./BusTrips/Router/tripsRouter')
const dbConnection = require('./Config/dbConnection')

async function db() {
    try {
        await dbConnection()
        console.log('databbase connected')
    } catch (error) {
        console.log(error)
    }
}

db()

app.use(express.json())



app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies if needed
  })
);


app.use('/user',router)
app.use('/bus-operator',busOperatorRouter)
app.use('/trips',tripsRouter)






app.listen(port,() =>{ console.log(`the app running on port ${port}`)}) 