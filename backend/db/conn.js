const mongoose = require('mongoose')

async function main() {
    const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/enjoei'; // Definindo fallback para o local
    await mongoose.connect(dbURI);
    console.log('Conectado ao Mongoose')
}

main().catch((err) => console.log(`Erro ao conectar com o Mongoose: ${err}`))

module.exports = mongoose