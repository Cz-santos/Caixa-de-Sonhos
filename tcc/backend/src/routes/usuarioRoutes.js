
import { Router } from "express";
import * as controller from "../controller/usuarioController.js";
import { upload } from "../utils/upload.js";

const endpoints = Router();

endpoints.post("/usuarios", controller.cadastrar);
endpoints.post("/login", controller.login);

endpoints.get("/usuarios", controller.listar);
endpoints.get("/usuarios/:id", controller.buscar);

endpoints.put("/usuarios/:id", upload.single("foto"), controller.atualizar);

endpoints.delete("/usuarios/:id", controller.excluir);

export default endpoints;
