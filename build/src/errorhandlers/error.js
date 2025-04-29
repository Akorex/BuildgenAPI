"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static NotFound() {
        return new CustomError(404, `Requested resource not found`);
    }
    static BadRequest(message) {
        return new CustomError(400, message);
    }
    static InternalServerError() {
        return new CustomError(500, `Internal Server Error`);
    }
}
exports.CustomError = CustomError;
