import express from "express";
import { Port, mongoDbUrl } from "./config.js";
import mongoose from "mongoose";
import ProductsRouter from "./routes/ProductsRouter.js";
import ClientsRouter from "./routes/ClientsRouter.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
app.use(
  cors({
    origin: "http:localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Hello");
});

app.use("/product", ProductsRouter);
app.use("/client", ClientsRouter);

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
