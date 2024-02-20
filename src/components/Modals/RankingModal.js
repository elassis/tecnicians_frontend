import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SAVE_RANKING_API } from "../../apis/rankingsApi";
import http from "../../axiosRequest";
import {
  showRankingModal,
  showSuccessModal,
} from "../../redux/slices/Modals/modalSlice";

const RankingModal = (props) => {
  const { job_id, tech_id } = props;
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const sendData = async (data) => {
    const objData = {
      technician_id: tech_id,
      job_id,
      job_ranking: data.ranking,
    };

   await http
      .post(SAVE_RANKING_API, objData)
      .then((response) => {
        if (response.status === 201) {
          dispatch(showRankingModal(false));
          dispatch(showSuccessModal(true));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit(sendData)}>
      <input
        type="number"
        {...register("ranking", {
          required: true,
        })}
      />
      <button>save ranking</button>
    </form>
  );
};

export default RankingModal;
