import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import NewPage from "./components/NewPage";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/test" element={<NewPage />} />
            <Route element={<PrivateRoutes />}>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/profile/:id" element={<Profile />} />
            </Route>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
