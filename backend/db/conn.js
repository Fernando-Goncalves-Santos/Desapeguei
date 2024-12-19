const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/enjoei')
    console.log('Conectado ao Mongoose')
}

main().catch((err) => console.log(`Erro ao conectar com o Mongoose: ${err}`))

module.exports = mongoose