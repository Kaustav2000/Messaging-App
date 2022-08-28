import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvier";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const collectionRef = collection(db, "rooms");

  useEffect(() => {
    getDocs(collectionRef).then((res) => {
      setRooms(
        res.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    // const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
    //   setRooms(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       data: doc.data(),
    //     }))
    //   )
    // );
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat={1} />
        {rooms?.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
