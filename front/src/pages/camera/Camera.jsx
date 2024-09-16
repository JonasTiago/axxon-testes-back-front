import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import LiveStream from "../../components/liveStream/LiveStream";
import Img from './Img'

import React from 'react';
import "./style.css";

export default function Camera() {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const videosourceid = location.state;

  useEffect(() => {
    fetchEvents();
  }, [])


  async function fetchEvents() {
    const API_URL = process.env.REACT_APP_BACK_END_URL;
    try {
      const {data} = await axios.get(`${API_URL}/archive/events/detectors/${videosourceid}/future/past`,{
        auth: {
          username: "root",
          password: "Big4dev2024"
        },
        headers: {                  
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8",
          "Cache-Control": "no-cache"
      },
      });
      const events = data.events
      setEvents(events);
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os nomes!");
    }
  }

  if (!videosourceid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="camera-detail">
      <div className="camera-stream">
        <h3>Camera Live</h3>
        {/* http://127.0.0.1:80/live/media/LAPTOP-3UEDE0C4/DeviceIpint.1/SourceEndpoint.video:0:0 */}
        {/* <LiveStream  url={`/archive/media/${event.source.replace("hosts/", "")}/${event.timestamp}?speed=1&enable_token_auth=1&valid_token_hours=1`} /> */}

        <LiveStream url={'/live/media/LAPTOP-3UEDE0C4/DeviceIpint.1/SourceEndpoint.video:0:0?speed=1'} />
      </div>
      <div className="camera-events">
        <h3>Camera Events</h3>
        <ul>
          {events.length > 0 ? events.filter(event => event.alertState === 'began').map( (event,i) => (
            <Link key={i} to={'/event'} state={event} >
              <li className="eventSigle">
                <strong>Type:</strong> {event.type}
                <strong>Timestamp:</strong> {event.timestamp}
                <Img videosourceid={videosourceid} event={event} />
              </li>
            </Link>
          )): ''}
        </ul>
      </div>
    </div>
  );
}