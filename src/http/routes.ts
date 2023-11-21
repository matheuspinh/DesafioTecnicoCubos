import express from "express";
import usersRoutes from "./controllers/users/router";
import accountsRoutes from "./controllers/accounts/router";

const appRoutes = express();

appRoutes.use(usersRoutes);
appRoutes.use(accountsRoutes);

export { appRoutes };
