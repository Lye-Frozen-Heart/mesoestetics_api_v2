import { Router } from "express";
import EmailController from "../controllers/EmailController";

const createEmailRouter = () => {
  const emailRouter = Router();
  const emailController = EmailController();
  emailRouter.post("/send-email", emailController.sendSupportEmail);
  return emailRouter;
};

const emailRouterIoC = (app) => {
  const emailsRouter = createEmailRouter();
  app.use("/email", emailsRouter);
};
export default emailRouterIoC;
