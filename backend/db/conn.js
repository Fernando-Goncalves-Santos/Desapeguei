const mongoose = require('mongoose')
require('dotenv').config();

async function main() {
    const dbURI = process.env.MONGO_URI
    await mongoose.connect(dbURI);
    console.log('Conectado ao Mongoose')
}

main().catch((err) => console.log(`Erro ao conectar com o Mongoose: ${err}`))

module.exports = mongoose