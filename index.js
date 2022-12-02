require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT= process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/v1', require('./app/routes'))

app.listen(PORT, () =>{
    console.log(`Listen in ${PORT}`)
})

