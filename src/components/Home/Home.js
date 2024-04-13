import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../../common/Layout/ModalLayout/ModalLayout";
import { showBookingModal } from "../../redux/slices/Modals/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import BookModal from "../Modals/BookModal/BookModal";
import { StyledHome } from "./HomeStyles";
import { Container } from "../../common/Layout/Container";
import { StyledListContainer } from "../../common/Layout/StyledList";
import { fetchTechnicians } from "../../redux/slices/Technicians/TechniciansSlice";
import TechnicianCard from "../../common/components/TechnicianCard/TechnicianCard";
import { setResponse } from "../../redux/slices/Response/responseSlice";

const Home = () => {
  const [selectedTechnician, setSelectedTechnician] = useState({});
  const { technicians } = useSelector((state) => state.technicians);
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookingModal } = useSelector((state) => state.modals);

  useEffect(() => {
    dispatch(fetchTechnicians());
    dispatch(setResponse({}));
  }, []);

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
              if (item.user_id === user.id) {
                return null;
              }
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
