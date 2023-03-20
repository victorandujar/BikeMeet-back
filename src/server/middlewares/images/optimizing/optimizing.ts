import { type NextFunction, type Response } from "express";
import path from "path";
import sharp from "sharp";
import { CustomError } from "../../../../CustomError/CustomError.js";
import { type CustomRequest } from "../../../../types/users/types";

const optimizing = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const originalname = req.file?.originalname;
  const filename = req.file?.filename;

  const basePath = `${path.basename(
    originalname!,
    path.extname(originalname!)
  )}`;

  try {
    await sharp(path.join("uploads", filename!))
      .resize(350, 200, { fit: "cover" })
      .webp({ quality: 100 })
      .toFormat("webp")
      .toFile(path.join("uploads", `${basePath}.webp`));

    req.file!.originalname = `${basePath}.webp`;
    req.file!.filename = `${basePath}.webp`;

    next();
  } catch (error) {
    const newError = new CustomError(
      "Error optimizing the provided image",
      400,
      "Error optimizing the provided image"
    );
    next(newError);
  }
};

export default optimizing;
