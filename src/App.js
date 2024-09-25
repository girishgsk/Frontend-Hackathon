import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Login from "./component/Login";
import Signup from "./component/Signup";
import IsNotAuthenticated from "./component/isNotAuthenticated";
import Navbar1 from "./component/navbar1";
import IsAuthenticated from "./component/isAuthenticated";
import Section from "./component/section";
import Role from "./component/Role";
import Home from "./component/home";
import User from "./component/users";
import CreatePost from "./component/createPost";
import UpdatePosts from "./component/updatePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<IsNotAuthenticated />}>
            <Route element={<Navbar />}>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>
          <Route element={<IsAuthenticated />}>
            <Route element={<Navbar1 />}>
              <Route element={<Section />}>
                <Route path="/home" element={<Home />} />
                <Route path="/createpost" element={<CreatePost />} />
                <Route path="/role" element={<Role />} />
                <Route path="/updatePost/:id" element={<UpdatePosts />} />
                <Route path="/user" element={<User />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
