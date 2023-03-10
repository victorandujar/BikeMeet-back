import { Router } from "express";
import { validate } from "express-validation";
import {
  loginUser,
  registerUser,
} from "../../controllers/usersControllers/usersControllers.js";
import loginUserSchema from "../../schemas/loginUserSchema.js";
import registerUserSchema from "../../schemas/registerUserSchema.js";

const loginRoute = "/login";
const registerRoute = "/register";

const usersRouter = Router();

usersRouter.post(
  loginRoute,
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);

usersRouter.post(
  registerRoute,
  validate(registerUserSchema, {}, { abortEarly: false }),
  registerUser
);

export default usersRouter;
