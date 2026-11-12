
import { Router } from "express";
import * as controller from "../controller/favoritoController.js";

const endpoints = Router();

endpoints.post("/favoritos", controller.adicionar);

endpoints.get("/favoritos/:id_usuario", controller.listar);

endpoints.delete("/favoritos/:id", controller.excluir);

endpoints.put("/favoritos/:id/status", controller.atualizarStatus);

export default endpoints;
