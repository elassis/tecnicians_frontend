import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import Navbar from "./common/components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Jobs from "./components/Jobs/Jobs";
import RankCommentJob from "./components/RankCommentJob/RankCommentJob";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const persistor = persistStore(store);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Navbar />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                <Route exact path="/jobs/:id" element={<Jobs />} />
                <Route exact path="/jobs/rank/:id" element={<RankCommentJob />} />
              </Route>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
