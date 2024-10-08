import { Router } from "express";
import {
  listEvents,
  archiveStream,
  stopStream,
  listFramesByVideo,
  getFrame,
  listContents,
} from "../controllers/archiveEventsController.js";

const archiveEventsRoutes = new Router();

archiveEventsRoutes.get("/", listContents);
archiveEventsRoutes.get("/detectors", listEvents);
archiveEventsRoutes.get("/:starttime", archiveStream);
archiveEventsRoutes.get("/stop/:uuid", stopStream);
archiveEventsRoutes.get("/frames/:endtime/:begintime", listFramesByVideo);
archiveEventsRoutes.get("/frame/:starttime", getFrame);

export default archiveEventsRoutes;
