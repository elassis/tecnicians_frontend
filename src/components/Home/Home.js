import React, { useState } from "react";
import http from "../../axiosRequest";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalStructure from "../Modals/ModalStructure";
import {
  showBookingModal,
  showMessagesModal,
  showSuccessModal,
} from "../../redux/slices/Modals/modalSlice";
import { useDispatch } from "react-redux";
import {
  addTechnician,
  addSkills,
} from "../../redux/slices/Technician/technicianSlice";
import BookModal from "../Modals/BookModal";
import RequestJobModal from "../Modals/RequestJobModal";
import SuccessModal from "../Modals/SuccessModal";
import { addUser } from "../../redux/slices/User/userSlice";
import { getSkills } from "../../common/functions";

const Home = () => {
  const [techs, setTechs] = useState([]);
  const techniciansAvailable = [];
  let skillsArr = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getTechnicians();
    setUserOnState();
  }, []);

  async function getTechnicians() {
    await http
      .get("/api/index")
      .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          response.data.map((tech) => techniciansAvailable.push(tech));
          setTechs(techniciansAvailable);
        }
      })
      .catch((error) => console.log(error));
  }
  async function setUserOnState() {
    const savedEmail = localStorage.getItem("user_email");
    await http
      .get(`/api/user/${savedEmail}`)
      .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          dispatch(addUser(...Object.values(response.data)));
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>This is the Home</h1>
      <h3>Available technicians</h3>
      {techs &&
        techs.map((item) => {
          return !document.cookie.includes(item.email) ? (
            <div key={item.id}>
              {item.first_name} {item.last_name} {item.ranking || 0}
              <button onClick={() => navigate(`/profile/${item.id}`)}>
                profile
              </button>
              <button
                onClick={() => {
                  dispatch(addTechnician(item));
                  getSkills(item.id, http, dispatch, skillsArr, addSkills);
                  dispatch(showBookingModal(true));
                }}
              >
                book
              </button>
            </div>
          ) : (
            ""
          );
        })}

      <ModalStructure
        children={<BookModal />}
        reducer={"bookingModal"}
        action={showBookingModal}
      />
      <ModalStructure
        children={<RequestJobModal />}
        reducer={"messagesModal"}
        action={showMessagesModal}
      />
      <ModalStructure
        children={<SuccessModal />}
        reducer={"successModal"}
        action={showSuccessModal}
      />
    </div>
  );
};

export default Home;
