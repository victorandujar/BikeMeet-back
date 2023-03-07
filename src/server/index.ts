import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import cors from "cors";

export const app = express();
app.disable("x-powered-by");

const allowedOrigins = [process.env.LOCALHOST!, process.env.NETLIFY_URL!];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());

app.use(notFoundError);
app.use(generalError);
