import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import http from "../../axiosRequest";
import { SAVE_JOBS } from "../../apis/jobsApi";
import {
  showMessagesModal,
  showSuccessModal,
} from "../../redux/slices/Modals/modalSlice";

const RequestJobModal = () => {
  const technician = useSelector((state) => state.technician.tech);
  const skill = useSelector((state) => state.technician.selectedSkill);
  const skills = useSelector((state) => state.technician.skills);
  const sender = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  async function sendMessage(data) {
    if (!data.text) {
      data.text = `hi!,I'd like to contract you as ${skill.toLowerCase()}`;
    }
    const informationToSave = skills.filter((e) => e.name === skill);
    const dataToSend = {
      technician_id: informationToSave[0].technician_id,
      profession_id: informationToSave[0].profession_id,
      user_id: sender.id,
      text: data.text,
      begin_date: data.begin_date,
      end_date: data.end_date,
    };

    await http
      .post(SAVE_JOBS, dataToSend)
      .then((response) => {
        if (response.status === 200) {
          dispatch(showSuccessModal(true));
          dispatch(showMessagesModal(false));
        }
      })
      .catch((error) => console.log(error));

  }

  return (
    <>
      <h2>Job request</h2>
      <p>
        Technician: {technician.first_name} {technician.last_name}
      </p>
      <p>Skill: {skill}</p>
      <form onSubmit={handleSubmit(sendMessage)}>
        <textarea
          style={{ width: "100%" }}
          {...register("text", {
            required: false,
          })}
          placeholder={`default: hi!,I'd like to contract you as ${skill.toLowerCase()}`}
        ></textarea>
        <label>Begin date</label>
        <input
          type="date"
          {...register("begin_date", {
            required: true,
          })}
        />

        <label>End date</label>
        <input
          type="date"
          {...register("end_date", {
            required: true,
          })}
        />
        <button>send</button>
      </form>
    </>
  );
};

export default RequestJobModal;
