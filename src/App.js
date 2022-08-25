import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './redux/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
