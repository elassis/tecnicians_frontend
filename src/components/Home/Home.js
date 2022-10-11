import React, { useState } from "react";
import http from "../../axiosRequest";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalStructure from "../Modals/ModalStructure";
import { showModal } from "../../redux/slices/Modals/modalSlice";
import { useDispatch } from "react-redux";
import {
  addTechnician,
  addSkills,
} from "../../redux/slices/Technician/technicianSlice";
import BookModal from "../BookModal/BookModal";

const Home = () => {
  const [techs, setTechs] = useState([]);
  const [show, setShow] = useState(false);
  const technicians_available = [];
  let skillsArr = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getTechnicians();
  }, []);

  async function getTechnicians() {
    await http
      .get("/api/index")
      .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          response.data.map((tech) => technicians_available.push(tech));
          setTechs(technicians_available);
        }
      })
      .catch((error) => console.log(error));
  }

  async function getSkills(id) {
    await http
      .get(`/api/tp/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          skillsArr = [];
          response.data.map((tech) => skillsArr.push(tech));
          dispatch(addSkills(skillsArr));
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
          return (
            <div key={item.id}>
              {item.first_name} {item.last_name} {item.ranking || 0}
              <button onClick={() => navigate(`/profile/${item.id}`)}>
                profile
              </button>
              <button
                onClick={() => {
                  dispatch(addTechnician(item));
                  getSkills(item.id);
                  setShow(true);
                  dispatch(showModal(true));
                }}
              >
                book
              </button>
            </div>
          );
        })}

      <ModalStructure>{show && <BookModal />}</ModalStructure>
    </div>
  );
};

export default Home;
