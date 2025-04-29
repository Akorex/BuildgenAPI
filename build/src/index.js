"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./errorhandlers/error.handler");
const error_handler_2 = require("./errorhandlers/error.handler");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.initMiddlewares();
        this.initRoutes(routes);
        this.initErrorHandlers();
        this.initDB();
    }
    initMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            next();
        });
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json({ limit: "25mb" }));
    }
    initErrorHandlers() {
        this.app.use(error_handler_1.notFoundHandler);
        this.app.use(error_handler_2.errorHandler);
    }
    initRoutes(routes) {
        routes.forEach((route) => {
            this.app.use(`/api/v1`, route.router);
        });
    }
    initDB() {
        //write instruction to init DB here
    }
    getApp() {
        return this.app;
    }
}
exports.default = App;
