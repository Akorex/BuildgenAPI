import * as dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || "";
export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE = process.env.DATABASE || "";
export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";
