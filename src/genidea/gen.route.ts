import { GenController } from "./gen.controller";
import { Router } from "express";

export class GenRoute {
  public router = Router();
  private controller = new GenController();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/generate", this.controller.generate);
  }
}
