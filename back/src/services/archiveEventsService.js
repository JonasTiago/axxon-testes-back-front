import api from "../api/api.js";

async function listEvents(videoSourceid) {
  try {
    const response = await api.get(
      `/archive/contents/intervals/${videoSourceid}/future/past`
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

async function getUuid() {
  try {
    const uuid = await api.get("/uuid");
    console.log("uuid", uuid);

    if (!uuid.data.uuid) {
      throw { message: "Cameras not found", code: 404 };
    }

    return uuid.data;
  } catch (error) {
    console.error("Error uuid:", error);
    throw error;
  }
}

async function archiveStream(videoSourceid, starttime, uuid) {
  try {
    const response = await api.get(
      `/archive/media/${videoSourceid}/${starttime}/?speed=1&w=640&h=480&enable_token_auth=1&valid_token_hours=12&id=${uuid}`
    );

    if (!response.data.path) {
      throw { message: "Cameras not found", code: 404 };
    }

    const stream = await api.get(response.data.path, {
      responseType: "stream",
    });

    return stream.data;
  } catch (error) {
    console.error("Error listing cameras:", error);
    throw error;
  }
}

async function archiveStopStream(uuid, videoSourceid) {
  try {
    const stop = await api.get(`archive/media/stop/${uuid}`);

    console.log("stop", stop.data.timestamp);

    const moment = await api.get(
      `/archive/media/${videoSourceid}/${stop.data.timestamp}`,
      {
        responseType: "arraybuffer",
      }
    );

    // if (!uuid.data.uuid) {
    //   throw { message: "stream not found", code: 404 };
    // }
    return moment.data;
  } catch (error) {
    console.error("Error uuid:", error);
    throw error;
  }
}

export const archiveEventsService = {
  listEvents,
  archiveStream,
  getUuid,
  archiveStopStream,
};
