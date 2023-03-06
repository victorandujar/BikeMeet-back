import "./loadEnvironment.js";
import createDebug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";
import startServer from "./server/startServer.js";

const port = process.env.PORT ?? 4000;

const debug = createDebug("index:*");

mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

try {
  await startServer(+port);
  debug(chalk.green(`Server listening on port ${port}`));
} catch (error) {
  debug(error.message);
}
