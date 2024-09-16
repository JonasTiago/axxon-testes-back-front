import { Router } from "express";
import {
  // createUser,
  // deleteUser,
  // findUser,
  // listUser,
  listCameras,
  listCamerasVideoOrigens,
  snapshotCamera,
  liveCamera,
} from "../controllers/cameraController.js";
import createUserValidate from "../middlewares/userSchemaMiddleware.js";

const camerasRoutes = new Router();

// camerasRoutes.post("/", createUserValidate, createUser);

camerasRoutes.get("/", listCameras);
camerasRoutes.get("/video-origins", listCamerasVideoOrigens);
camerasRoutes.get("/snapshot", snapshotCamera);
camerasRoutes.get("/live", liveCamera);

// camerasRoutes.delete("/:user_id", deleteUser);

// camerasRoutes.get("/:user_id", findUser);

// camerasRoutes.put("/:user_id", updateUser);

// camerasRoutes.post("/sign-in", signIn);

export default camerasRoutes;
