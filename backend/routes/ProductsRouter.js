import express from "express";
import { Products } from "../models/baseModels.js";
const router = express.Router();

//Route for create a product

router.post("/new", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/detail/:id", async (req, res) => {
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
router.put("/update/:id", async (req, res) => {
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
router.delete("/delete/:id", async (req, res) => {
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

export default router;
