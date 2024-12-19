const express = require('express')
const cors = require('cors')


//  Instanciando o express
const app = express()



// Configurando a resposta em JSON
app.use(express.json())

// Resolvendo CORS
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))

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