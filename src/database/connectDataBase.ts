import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("bikemeet:database:connectDataBase:*");

const connectDataBase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
  } catch (error) {
    debug(error);
  }
};

export default connectDataBase;
