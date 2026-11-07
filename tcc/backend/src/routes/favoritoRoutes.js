
import { Router } from "express";
import * as controller from "../controller/favoritoController.js";

const endpoints = Router();

endpoints.post("/favoritos", controller.adicionar);

endpoints.get("/favoritos/:id_usuario", controller.listar);

endpoints.delete("/favoritos/:id", controller.excluir);

export default endpoints;
