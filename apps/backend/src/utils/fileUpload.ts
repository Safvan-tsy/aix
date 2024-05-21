import AppError from "./appError";

const multer = require("multer");

// for uploading resumes
const multerStorage = multer.diskStorage({});
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Not a valid resume file! Please upload only PDF or Word documents.",
        400
      ),
      false
    );
  }
};
export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
