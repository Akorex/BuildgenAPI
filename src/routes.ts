import { GenRoute } from "./genidea/gen.route";

import { Route } from "./routes.interface";
import authRouter from "./authentication/auth.route";

export const routes: Route[] = [new GenRoute()
  {
    path: "auth",
    router: authRouter,
  },
];
