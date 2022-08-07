import { Routes, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { useStateValue } from "./StateProvier";

function App() {
  const [{ user }, dispatch] = useStateValue(null);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Routes>
            <Sidebar />
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
