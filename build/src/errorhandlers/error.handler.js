"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const error_1 = require("./error");
const notFoundHandler = (req, res, next) => {
    next(error_1.CustomError.NotFound());
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, req, res, next) => {
    // Default response details
    let message = "Request failed. Try again later";
    let code = 500;
    // Check for known error types and set response details
    if (error instanceof error_1.CustomError) {
        message = error.message;
        code = error.code;
    }
    else if (error instanceof SyntaxError ||
        error instanceof ReferenceError ||
        error instanceof TypeError ||
        error instanceof RangeError ||
        error instanceof URIError ||
        error instanceof EvalError) {
        message = error.message;
        code = 400;
    }
    else if (error.code) {
        switch (error.code) {
            case "23505": // Unique violation
                message = "Duplicate key error";
                code = 409;
                break;
            // Add more specific error codes here as needed
            default:
                message = "Database error";
                code = 400;
                break;
        }
    }
    else if (error instanceof Error) {
        message = error.message;
        code = 422;
    }
    // Send formatted error response
    res.status(code).json({ success: false, message });
};
exports.errorHandler = errorHandler;
