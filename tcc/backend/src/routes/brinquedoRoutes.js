
import { Router } from "express";
import * as controller from "../controller/brinquedoController.js";

const endpoints = Router();

endpoints.post("/brinquedos", controller.cadastrar);

endpoints.get("/brinquedos", controller.listar);
endpoints.get("/brinquedos/disponiveis", controller.listarDisponiveis);
endpoints.get("/brinquedos/:id", controller.buscar);

endpoints.put("/brinquedos/:id", controller.atualizar);

endpoints.delete("/brinquedos/:id", controller.excluir);

export default endpoints;
