const jwt = require('jsonwebtoken')


// Recebe um usuário e retorna um token atrelado a ele e o seu userId
const createUserToken = async (user, req, res) => {

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "meusecret")

    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })

}

module.exports = createUserToken