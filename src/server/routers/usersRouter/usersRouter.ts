import { Router } from "express";
import { validate } from "express-validation";
import loginUser from "../../controllers/usersControllers/usersControllers.js";
import loginUserSchema from "../../schemas/loginUserSchema.js";

const loginRoute = "/login";

const usersRouter = Router();

usersRouter.post(
  loginRoute,
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
