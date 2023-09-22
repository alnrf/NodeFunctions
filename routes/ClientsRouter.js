import express from "express";
import { Clients } from "../models/baseModels.js";
const router = express.Router();

//Route for create a a user

router.post("/new", async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.email) {
      return res.status(400).send({
        message: "Preencha todos os campos",
      });
    }

    const payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      document: req.body.document,
      email: req.body.email,
      phone: req.body.phone,
      streetName: req.body.streetName,
      number: req.body.number,
      complement: req.body.complement,
      neighborhood: req.body.neighborhood,
      postalCode: req.body.postalCode,
      city: req.body.city,
      state: req.body.state,
      createdAt: new Date().toISOString(),
    };

    const client = await Clients.create(payload);
    return res.status(201).send(client);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for get a product by id
router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Clients.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado!" });
    }
    return res.status(200).json(client);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route for get all clients
router.get("/", async (req, res) => {
  try {
    const client = await Clients.find({});
    return res.status(200).json({
      count: client.length,
      data: client,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route for update a client by id
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Clients.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Cliente não encontrado!" });
    }
    return res.status(200).send({ message: "Cliente atualizado com sucesso." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

// Route for delete a client by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Clients.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Cliente não encontrado!" });
    }
    return res.status(200).send({ message: "Cliente excluído com sucesso." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: error.message,
    });
  }
});

export default router;
