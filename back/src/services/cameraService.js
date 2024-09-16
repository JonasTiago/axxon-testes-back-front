import api from "../api/api.js";

async function listCameras() {
  try {
    const response = await api.get("/camera/list");

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listing cameras:", error);
    throw error;
  }
}

async function listCamerasVideoOrigens() {
  try {
    const response = await api.get("/video-origins");

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listing cameras:", error);
    throw error;
  }
}

async function snapshotCamera() {
  try {
    const response = await api.get(
      "/live/media/snapshot/LAPTOP-3UEDE0C4/DeviceIpint.1/SourceEndpoint.video:0:0",
      { responseType: "arraybuffer" }
    );

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listing cameras:", error);
    throw error;
  }
}

async function liveCamera() {
  try {
    const response = await api.get(
      "/live/media/LAPTOP-3UEDE0C4/DeviceIpint.1/SourceEndpoint.video:0:0",
      { responseType: "stream" }
    );

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching live camera stream:", error);
    throw error;
  }
}

export const cameraService = {
  listCameras,
  listCamerasVideoOrigens,
  snapshotCamera,
  liveCamera,
};
