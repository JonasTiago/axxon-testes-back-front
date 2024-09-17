import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import React from "react";
import "./style.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_END_URL;

export default function Camera() {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const videosourceid = location.state;

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const API_URL = process.env.REACT_APP_BACK_END_URL;
    try {
      const { data } = await axios.get(
        `${API_URL}/events/detectors?videoSourceid=${videosourceid}`
      );

      console.log(data.events);

      setEvents(data.events);
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os events!");
    }
  }

  if (!videosourceid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="camera-detail">
      <div className="camera-stream">
        <h3>Camera Live</h3>
        <img
          src={`${API_URL}/cameras/live?videoSourceid=${videosourceid}`}
          alt=""
        />
      </div>
      <div className="camera-events">
        <h3>Camera Events</h3>
        <ul>
          {events.length > 0
            ? events
                .filter((event) => event.alertState === "began")
                .map((event, i) => (
                  <Link key={i} to={"/event"} state={event}>
                    <li className="eventSigle">
                      <strong>Type:</strong> {event.type}
                      <strong>Timestamp:</strong> {event.timestamp}
                      <img
                        src={`${API_URL}/events/frame/${event.timestamp}?videoSourceid=${videosourceid}`}
                        alt=""
                      />
                    </li>
                  </Link>
                ))
            : ""}
        </ul>
      </div>
    </div>
  );
}
