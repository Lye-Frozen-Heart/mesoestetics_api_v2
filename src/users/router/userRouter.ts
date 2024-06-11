import { Router } from "express";
import UsersController from "../controllers/UsersController";

const createUsersRouter = (repository) => {
  const usersRouter = Router();
  const usersController = UsersController(repository);

  usersRouter.get("/", usersController.getAllUsers);
  usersRouter.get("/:id", usersController.getUser);
  usersRouter.post("/", usersController.createUser);
  usersRouter.put("/:id", usersController.updateUser);
  usersRouter.delete("/:id", usersController.deleteUser);

  return usersRouter;
};

const usersRouterIoC = (app, repository) => {
  const usersRouter = createUsersRouter(repository);
  app.use("/users", usersRouter);
};
export default usersRouterIoC;
