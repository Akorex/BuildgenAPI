"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const http_1 = __importDefault(require("http"));
// import { PORT, NODE_ENV } from "../../env";
const routes_1 = require("./routes");
class Server {
    constructor() {
        this.app = new _1.default(routes_1.routes);
        this.port = 3000;
        this.server = http_1.default.createServer(this.app.getApp());
    }
    start() {
        this.server.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
            console.log(`⚡DEV server started on ${this.port}⚡`);
        }));
    }
}
new Server().start();
