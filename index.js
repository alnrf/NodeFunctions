import express from "express";
import { Port, mongoDbUrl } from "./config.js";
import mongoose from "mongoose";
import { Products } from "./models/baseModels.js";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Hello");
});

app.use(express.json());

//Route for create a product

app.post("/product/new", async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).send({
        message: "Preencha todos os campos",
      });
    }

    const payload = {
      title: req.body.title,
      description: req.body.description,
      filamentColor: req.body.filamentColor,
      printingTime: req.body.printingTime,
      price: req.body.price,
      quantityStock: req.body.quantityStock,
      createdAt: new Date().toISOString(),
    };

    const product = await Products.create(payload);
    return res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for get a product
app.get("/product/create", async (req, res) => {
  try {
    const product = await Products.find({});
    return res.status(200).json({
      count: product.length,
      data: product,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route for get a product by id
app.get("/product/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route for update a product by id
app.put("/product/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Products.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }
    return res.status(200).send({ message: "Produto atualizado com sucesso." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route for delete a product by id
app.delete("/product/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Products.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }
    return res.status(200).send({ message: "Produto excluído com sucesso." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("Aplicação conectada ao banco.");
    app.listen(Port, () => {
      console.log(`Aplicação rodando na porta ${Port}.`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
