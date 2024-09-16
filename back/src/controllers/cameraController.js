import { cameraService } from "../services/cameraService.js";

async function listCameras(req, res) {
  try {
    const cameras = await cameraService.listCameras();
    res.status(200).send(cameras);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function snapshotCamera(req, res) {
  try {
    const snapshot = await cameraService.snapshotCamera();

    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", 'inline; filename="snapshot.jpg"');

    res.send(snapshot);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function liveCamera(req, res) {
  try {
    const cameraStream = await cameraService.liveCamera();

    res.set("Content-Type", "multipart/x-mixed-replace; boundary=ngpboundary");
    res.set("Content-Disposition", "inline");

    cameraStream.pipe(res);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function listCamerasVideoOrigens(req, res) {
  try {
    const cameras = await cameraService.listCamerasVideoOrigens();
    res.status(200).send(cameras);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { listCameras, listCamerasVideoOrigens, snapshotCamera, liveCamera };
