import "./loadEnvironment.js";
import createDebug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";
import startServer from "./server/startServer.js";
import connectDataBase from "./database/connectDataBase.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL_CONNECTION;

const debug = createDebug("index:*");

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await connectDataBase(mongoDbUrl!);
  debug(chalk.green("Connected to data base."));

  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
