const Product = require("../models/Product");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ProductController {
  // Criando produto
  static async create(req, res) {
    const { name, price, description } = req.body;
    const images = req.files;
    const available = true;

    // upload de imagens

    // Validações

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }
    if (!price) {
      res.status(422).json({ message: "O preço é obrigatório!" });
      return;
    }

    if (!description) {
      res.status(422).json({ message: "A descrição é obrigatória!" });
      return;
    }

    if (images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória" });
      return;
    }

    // Dono do produto
    const token = getToken(req);
    const user = await getUserByToken(token);

    const product = new Product({
      name,
      price,
      description,
      available,
      images: [],
      user: {
        _id: user.id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      product.images.push(image.filename);
    });

    try {
      // Product é uma instancia do Model Product, portanto tem o método save que o salva corretamente na collection certa
      const newProduct = await product.save();
      res
        .status(201)
        .json({ message: "Produto cadastrado com sucesso", newProduct });
      return;
    } catch (error) {
      res.status(500).json({ message: `Erro: ${error}` });
    }
  }

  static async getAll(req, res) {
    const products = await Product.find().sort("-createdAt");
    return res.status(200).json({ products });
  }

  static async getAllUserProducts(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    console.log(user._id);
    console.log("Tipo do User ID:", typeof user._id);
    // Como o user._id é um subdocument, preciso colocar ele entre aspas (preciso arrumar a criação do objeto produto depois quando)
    const products = await Product.find({ "user._id": String(user._id) }).sort(
      "-createdAt"
    );
    return res.status(200).json({ products });
  }

  static async getAllUserOrders(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const products = await Product.find({ "customer._id": user._id }).sort(
      "-createdAt"
    );
    return res.status(200).json({ products });
  }

  static async getProductById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    return res.status(200).json({ product });
  }

  static async removeProductById(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const productId = req.params.id;

    // O id é valido?
    if (!ObjectId.isValid(productId)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const product = await Product.findById(productId);
    // O produto existe?
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    // O produto pertence ao usuário logado?
    if (product.user._id.toString() !== user.id) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    await Product.findByIdAndDelete(productId);
    return res.status(200).json({ message: "Produto removido com sucesso!" });
  }

  static async updateProduct(req, res) {
    const id = req.params.id;
    const token = getToken(req);
    const user = await getUserByToken(token);

    // O id é valido?
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const product = await Product.findById(id);

    // O produto existe?
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    // O produto pertence ao usuário logado?
    if (product.user._id.toString() !== user.id) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    const { name, price, description, available } = req.body;
    const images = req.files;

    const updatedData = {};

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    updatedData.name = name;

    if (!price) {
      res.status(422).json({ message: "O preço é obrigatório!" });
      return;
    }

    updatedData.price = price;

    if (!description) {
      res.status(422).json({ message: "A descrição é obrigatória!" });
      return;
    }

    updatedData.description = description;

    if (images.length > 0) {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Product.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Produto atualizado com sucesso!" });
  }

  static async startNegotiation(req, res) {
    const id = req.params.id;

    // O id é valido?
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const product = await Product.findById(id);

    // O produto existe?
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    // O produto pertence ao usuário logado?
    if (product.user._id.toString() === user.id) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    // O produto ja foi vendido?
    if (product.customer) {
      if (product.customer._id.toString() === user.id) {
        res
          .status(422)
          .json({ message: "Você já está negociando esse produto" });
          return
      }
    }

    // Adiciona o cliente ao produto
    product.customer = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Product.findByIdAndUpdate(id, product);

    res.status(200).json({
      message: `A negociação foi agendada com sucesso! Entre em contato com ${product.user.name} pelo telefone ${product.user.phone}`,
    });
  }

  static async concludeSale(req, res) {
    const id = req.params.id;
    const token = getToken(req);
    const user = await getUserByToken(token);

    // O id é valido?
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const product = await Product.findById(id);

    // O produto existe?
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado" });
      return;
    }

    // O produto pertence ao usuário logado?
    if (product.user._id.toString() !== user.id) {
      res.status(422).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    product.available = false;

    await Product.findByIdAndUpdate(id, product);

    res
      .status(200)
      .json({ message: "Parabéns! A venda foi concluída com sucesso!" });
  }
};
