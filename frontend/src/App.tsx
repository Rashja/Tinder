import "./App.css";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
