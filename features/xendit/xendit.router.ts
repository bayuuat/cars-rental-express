import { Router } from "express";
import xenditController from "./xendit.controller";

const xenditRouter = Router();

xenditRouter.get("/balance", xenditController.balance);
xenditRouter.get("/invoice", xenditController.invoice);
xenditRouter.post("/callback", xenditController.callback);

export default xenditRouter;
