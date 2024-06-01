import React, { useEffect } from "react";
import { fetchData, storeData } from "../../apis/ApiActions";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../common/components/Input/Input";
import Textarea from "../../common/components/Textarea/Textarea";
import Button from "../../common/components/Button/Button";
import Text from "../../common/components/Text/Text";
import { green100 } from "../../common/constants/colors";
import { StyledRankComment } from "./RankCommentJobStyles";
import { useDispatch, useSelector } from "react-redux";
import { GET_JOB, SAVE_RANKING_COMMENT } from "../../apis/jobsApi";
import { setJobState } from "../../redux/slices/Jobs/jobsSlice";
import { setResponse } from "../../redux/slices/Response/responseSlice";
import { setErrors } from "../../redux/slices/Errors/errorsSlice";
import ResponseModal from "../Modals/SuccessModal";

const RankCommentJob = (props) => {
  const {
    register,
    handleSubmit,
    triggerValidation,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const { job } = useSelector(state => state.jobs);
  const { stateErrors } = useSelector(state => state.errors);
  const { response } = useSelector(state => state.response);

  useEffect(() => {
    fetchData(GET_JOB.replace('id', id), dispatch, setJobState);
  }, [id]);

  useEffect(() => {
    if (String(stateErrors).includes('422')) {
      setError('comment', {
        type: 'Manual',
        message: "comment must be at least 5 characters long."
      });
    }
  }, [stateErrors]);

  const handleInputChange = async (e) => {
    await triggerValidation(e.target.name);
  }

  const saveData = (data) => {
    const { comment, ranking } = data;

    const payload = {
      id,
      comment,
      ranking,
    };

    storeData(SAVE_RANKING_COMMENT, payload, dispatch, setResponse);
    dispatch(setErrors({}));
  };

  return (
    response.data.status === 200 ?
      <ResponseModal
        response={{ data: response.data.status }}
        mssg={{ success: response.data.message }}
      />
      :
      <StyledRankComment>
        <div className="heading">
          <Text
            size={"20px"}
            weight={"700"}
            textColor={green100}>
            Rank and comment
          </Text>

          {job.data && (
            <Text className={"excert"}>
              {`please rate and comment about the work of ${job.data.technician_name} as ${job.data.profession}`}
            </Text>
          )}
        </div>
        <form onSubmit={handleSubmit(saveData)}>
          <Input
            name={"ranking"}
            type={"number"}
            errors={errors}
            control={control}
            placeholder={'rate here!'}
            {...register("ranking", {
              required: true
            })}
          />
          <Textarea
            name={"comment"}
            errors={errors}
            control={control}
            onChange={handleInputChange}
            placeholder={'place your comment here!'}
            {...register("comment", {
              required: true,
            })}
          />
          <Button>Submit</Button>
        </form>
      </StyledRankComment>
  );
};

export default RankCommentJob;
