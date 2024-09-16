import api from "../api/api.js";

async function listServer() {
  try {
    const response = await api.get("/hosts");

    if (!response.data) {
      throw { message: "Cameras not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listing cameras:", error);
    throw error;
  }
}

async function inforServer(host) {
  try {
    const response = await api.get("/hosts/" + host);

    if (!response.data) {
      throw { message: " not found", code: 404 };
    }

    return response.data;
  } catch (error) {
    console.error("Error listing cameras:", error);
    throw error;
  }
}

export const serverService = {
  listServer,
  inforServer,
};
