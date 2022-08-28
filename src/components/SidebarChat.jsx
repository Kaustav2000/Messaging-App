import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import { collection, addDoc, getDocs } from "firebase/firestore";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const collectionRefMessage = collection(db, "rooms/" + id + "/messages");
  const collectionRef = collection(db, "rooms");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      getDocs(collectionRefMessage).then((res) => {
        setMessages(res.docs.map((doc) => doc.data()));
      });
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      addDoc(collectionRef, {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
