const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class userController {

  // Recebe os dados do usuário através do body e os valida. Cria um usuário no banco e um token
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // Validações
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (password !== confirmpassword) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação não são iguais!" });
      return;
    }

    // Verificação de usuário já existente
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: "Usuário já cadastrado!" });
    }

    // Criação de senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criação do usuário
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    // Cria o usuário e ja o autentica com o token
    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }


  // Recebe email e senha, compara a senha com o banco e gera um token
  static async login(req, res) {
    const { email, password } = req.body;

    // Validações
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    // Verifica se usuário existe
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(422).json({ message: "Usuário não cadastrado!" });
      return;
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(422).json({ message: "Senha incorreta!" });
      return;
    }

    // Autentica o usuário
    await createUserToken(user, req, res);
  }



  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "meusecret");

      currentUser = await User.findById(decoded.id);

      // Medida de segurança para que a senha não fique exposta
      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }



  static async getUserById(req, res) {
    const id = req.params.id;
    let user;

    try {
      user = await User.findById(id).select("-password");
    } catch (error) {
      res.status(422).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;
    const { name, email, phone, password, confirmpassword } = req.body;



    const token = getToken(req);
    const user = await getUserByToken(token);

    if(req.file) {
        user.image = req.file.filename
    }

    // Validações
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    // Verifica se o e-mail já esta em uso
    const userExists = await User.findOne({ email: email });
    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Email já cadastrado!" });
      return
    }

    user.email = email;

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    user.phone = phone;

    if (password !== confirmpassword) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação não são iguais!" });
      return;
    } else if (password === confirmpassword && password != null) {
      // Criação de senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash
    }

    try {

        await User.findOneAndUpdate(
            {_id: user._id},
            {$set: user},
            {new: true},
        )

        res.status(200).json({message: 'Usuário atualizado com sucesso!'})
        
    } catch (error) {
        res.status(500).json({message: err})
        return
    }
  }
};
