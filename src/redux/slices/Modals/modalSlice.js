import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  bookingModal: false,
  messagesModal: false,
  successModal: false,
  rankingModal: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showBookingModal: (state, action) => {
      state.bookingModal = action.payload;
    },
    showMessagesModal: (state, action) => {
      state.messagesModal = action.payload;
    },
    showSuccessModal: (state, action) => {
      state.successModal = action.payload;
    },
    showRankingModal: (state, action) => {
      state.rankingModal = action.payload;
    },
  },
});




export const { showBookingModal, showSuccessModal, showMessagesModal, showRankingModal } = modalsSlice.actions;



