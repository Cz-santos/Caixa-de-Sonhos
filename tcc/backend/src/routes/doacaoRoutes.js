
import { Router } from "express";
import * as controller from "../controller/doacaoController.js";

const endpoints = Router();

endpoints.post("/doacoes", controller.cadastrar);

endpoints.get("/doacoes", controller.listar);
endpoints.get("/doacoes/doador/:id_doador", controller.listarPorDoador);
endpoints.get("/doacoes/:id", controller.buscar);

endpoints.put("/doacoes/:id", controller.atualizar);

endpoints.delete("/doacoes/:id", controller.excluir);

export default endpoints;
