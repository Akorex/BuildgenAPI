import { Route } from "./routes.interface";
import authRouter from "./authentication/auth.route";

export const routes: Route[] = [
  {
    path: "auth",
    router: authRouter,
  },
];
