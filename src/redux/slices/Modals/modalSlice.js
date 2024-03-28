import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  bookingModal: false,
  editInfoModal: false,
  editProfessionsModal: false,
  rankingModal: false,
  jobsModal: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showBookingModal: (state, action) => {
      state.bookingModal = action.payload;
    },
    showEditProfessionsModal: (state, action) => {
      state.editProfessionsModal = action.payload;
    },
    showEditInfoModal: (state, action) => {
      state.editInfoModal = action.payload;
    },
    showJobsModal: (state, action) => {
      state.jobsModal = action.payload;
    },
    showRankingModal: (state, action) => {
      state.rankingModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      return initialState;
    });
  },
});

export const {
  showBookingModal,
  showEditInfoModal,
  showEditProfessionsModal,
  showRankingModal,
  showJobsModal,
} = modalsSlice.actions;
