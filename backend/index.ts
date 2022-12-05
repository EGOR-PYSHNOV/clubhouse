import { uploader } from "./core/uploader";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { passport } from "./core/passport";
import "./core/db";
import AuthController from "./controllers/AuthController";
import UploadController from "./controllers/UploadController";
import RoomController from "./controllers/RoomController";

/* TODO: 
Add docker
Add good path for file in back and front
*/

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.index
);
app.post(
  "/rooms",
  passport.authenticate("jwt", { session: false }),
  RoomController.create
);
app.get(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.show
);
app.delete(
  "/rooms/:id",
  passport.authenticate("jwt", { session: false }),
  RoomController.delete
);

app.post(
  "/auth/sms/activate",
  passport.authenticate("jwt", { session: false }),
  AuthController.activate
);

app.get(
  "/auth/sms",
  passport.authenticate("jwt", { session: false }),
  AuthController.sendSMS
);

app.get(
  "/auth/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.getMe
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

app.get(
  "/auth/google/callback/",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  AuthController.authCallback
);

app.post("/upload", uploader.single("photo"), UploadController.upload);

app.listen(PORT, () => {
  console.log(`SERVER WAS RUNNED ${PORT}`);
});
