import React, { useContext, useState } from "react";
import "./JoinRoom.css"
import gameContext from "../../gameContext";
import gameService from "../../services/GameService/GameService";
import socketService from "../../services/SocketService/SocketService";

const JoinRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);

  const { setInRoom, isInRoom } = useContext(gameContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => { // sends a request to the server and says: this is the room id that I wanna join
    e.preventDefault();

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true); // if the server is overloaded etc.

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <div className="join-room-container">
        <h4>Enter Room ID to Join the Game</h4>
        <input className="roomId-input"
          placeholder="Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <button type="submit" disabled={isJoining} className="join-button">
          {isJoining ? "Joining..." : "Join"}
        </button>
      </div>
    </form>
  );
}

export default JoinRoom;