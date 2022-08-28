import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  Mic,
  HdrPlusRounded,
  Image,
} from "@mui/icons-material";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  FieldValue,
  Timestamp,
} from "firebase/firestore";
import { useStateValue } from "../StateProvier";

import "./Chat.css";
// import firebase from "firebase";
import db from "../firebase";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue(null);
  const collectionRefChat = collection(db, "rooms/" + roomId + "/messages");
  const collectionRef = collection(db, "rooms");

  console.log(messages);

  useEffect(() => {
    if (roomId) {
      getDocs(collectionRef).then((res) => {
        setRoomName(
          res.docs
            .map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
            .filter((el) => el.id === roomId)[0].data.name
        );
      });

      getDocs(collectionRefChat).then((response) =>
        setMessages(response.docs.map((item) => item.data()).reverse())
      );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    addDoc(collectionRefChat, {
      message: input,
      name: user.displayName,
      timestamp: Timestamp.now(),
    });

    setMessages((e) => [
      ...e,
      {
        message: input,
        name: user.displayName,
        timestamp: Timestamp.now(),
      },
    ]);

    setInput("");
  };

  const ImgInsert = (e) => {
    const files = e.target.files;

    addDoc(collectionRefChat, {
      file: files[0],
      name: user.displayName,
      timestamp: Timestamp.now(),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setMessages((e) => [
      ...e,
      {
        file: files[0],
        name: user.displayName,
        timestamp: Timestamp.now(),
      },
    ]);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__message ${
              message.name === user.displayName && `chat__receiver`
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonOutlinedIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
          <input
            type="file"
            src={<Image />}
            accept=".jpg, .pmg, .jpeg"
            onClick={ImgInsert}
          />
        </form>
        {/* <Image /> */}
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
