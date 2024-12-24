const express = require('express')
const cors = require('cors')
require('dotenv').config();


//  Instanciando o express
const app = express()



// Configurando a resposta em JSON
app.use(express.json())

// Resolvendo CORS
app.use(cors({credentials: true, origin: process.env.RENDER_API }))
// process.env.RENDER_API

// Configurando a Public
app.use(express.static('public'))

// Rotas
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

const ProductRoutes = require('./routes/ProductRoutes')
app.use('/products', ProductRoutes)



// Inicialização
const PORT = process.env.PORT || 5000
app.listen(PORT)