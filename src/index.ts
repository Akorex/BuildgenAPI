import express, { Express, NextFunction, Response, Request } from "express";
import cors from "cors";
import { notFoundHandler } from "./errorhandlers/error.handler";
import { errorHandler } from "./errorhandlers/error.handler";
import { Routes } from "./routes.interface";
import mongoose from "mongoose";
class App {
  public app: Express;

  constructor(routes: Routes) {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes(routes);
    this.initErrorHandlers();
    this.initDB();
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: "25mb" }));
  }

  private initErrorHandlers() {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  private initRoutes(routes: Routes) {
    routes.forEach((route) => {
      this.app.use(`/api/v1/${route.path}`, route.router);
    });
  }

  private initDB() {
    const DATABASE = process.env.DATABASE || "";
    mongoose
      .connect(DATABASE)
      .then(() => {
        console.log("Database connection successfully established");
      })
      .catch((error) => {
        console.error("Error connecting to database:", error);
        process.exit(1);
      });
  }

  getApp() {
    return this.app;
  }
}

export default App;
