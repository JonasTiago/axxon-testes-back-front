import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import webSocket from "../../WebSocket/WebSocket.ts";
import './style.css';
import Snapshot from "../../components/snapshot/Snapshot";

const API_URL = process.env.REACT_APP_BACK_END_URL;

export default function Server() {
  const [servers, setServers] = useState([]);
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    webSocket();
    getServers();
    getCameras(servers)
  }, [])
  
  async function getServers() {

    try {
      const response = await axios.get(`${API_URL}/hosts`, {
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

      setServers(response.data);

    } catch (error) {
      console.log(error);
      alert("Erro!");
    }
  }
 
  async function getCameras(server) {
    // GET http://127.0.0.1:80/camera/list?filter=Server1
    try {
      const {data} = await axios.get(`${API_URL}/camera/list?filter=${server}`,{
        auth: {
          username: "root",
          password: "Big4dev2024"
        },
        headers: {                  
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Cache-Control": "no-cache"
      },

       
      });
      setCameras(data.cameras);
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os nomes!");
    }
  }
  
  return (
      <div>
        <ul className="server-list">
        <h1>Servidores Ativos</h1>
          {
          servers.map((server, i) => (
            <li key={i}>
                <h3>{server}</h3>
              <br />
              {cameras.length > 0 ? (
              <ul className="camera-list">
                {cameras.map((camera,i) => 
                <Link key={i} to={`/camera/${camera.displayName}`} 
                      state={camera.accessPoint.replace("hosts/", "")} 
                      >
                  <li className="camera-item" >
                      <span>
                          {camera.displayName}
                      </span>
                    <br />
                    <Snapshot camera={camera}/>
                  </li>
                </Link>
              )}
              </ul>
            ): "Não há nomes Cameras..." }
            </li>
          ))}
        </ul>
      </div>
    );
}
