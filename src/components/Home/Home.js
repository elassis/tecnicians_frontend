import React, { useState }from "react";
import http from "../../axiosRequest";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../../common/Layout/ModalLayout/ModalLayout";
import {
  showBookingModal,
} from "../../redux/slices/Modals/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import BookModal from "../Modals/BookModal/BookModal";
import { addUser } from "../../redux/slices/User/userSlice";
import { StyledHome } from "./HomeStyles";
import { Container } from "../../common/Layout/Container";
import { StyledListContainer } from "../../common/Layout/StyledList";
import { fetchTechnicians } from "../../redux/slices/Technicians/TechniciansSlice";
import TechnicianCard from "../../common/components/TechnicianCard/TechnicianCard";

const Home = () => {
  const [selectedTechnician, setSelectedTechnician] = useState({});
  const { technicians } = useSelector((state) => state.technicians);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookingModal } = useSelector(
    (state) => state.modals
  );

  useEffect(() => {
    dispatch(fetchTechnicians());
    setUserOnState();
  }, []);

  //TODO - state should keep user on state, this function shouldn't be needed
  async function setUserOnState() {
    const savedEmail = localStorage.getItem("user_email");
    await http
      .get(`/api/user/${savedEmail}`)
      .then((response) => {
        if(response.status === 200){
          dispatch(addUser(response.data.data.user_info));
        }
      })
      .catch((error) => console.log(error));
  }

  const displayModal = (technician) => {
    setSelectedTechnician(technician);
    dispatch(showBookingModal(true));
  };

  const callToActions = {
    showModal: displayModal,
    navigation: navigate,
  };

  return (
    <Container>
      <StyledHome>
        <h1>Available technicians</h1>
        <StyledListContainer>
          {technicians &&
            technicians.length > 0 &&
            technicians.map((item) => {
              return (
                <TechnicianCard
                  {...item}
                  key={item.id}
                  callToActions={callToActions}
                />
              );
            })}
        </StyledListContainer>
        {bookingModal && (
          <ModalLayout
            title={"Contact Request"}
            children={<BookModal {...selectedTechnician} />}
            action={showBookingModal}
          />
        )}
      </StyledHome>
    </Container>
  );
};

export default Home;
