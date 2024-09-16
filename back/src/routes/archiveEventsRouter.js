import { Router } from "express";
import {
  listEvents,
  archiveStream,
  stopStream,
} from "../controllers/archiveEventsController.js";

const archiveEventsRoutes = new Router();

archiveEventsRoutes.get("/", listEvents);
archiveEventsRoutes.get("/:starttime", archiveStream);
archiveEventsRoutes.get("/stop/:uuid", stopStream);
// archiveEventsRoutes.get("/:host", inforServer);
// archiveEventsRoutes.get("/video-origins", listCamerasVideoOrigens);

export default archiveEventsRoutes;
