import React from "react";
import PropTypes from "prop-types";
import Text from "../../../common/components/Text/Text";
import Tag from "../../../common/components/Tag/Tag";
import Button from "../../../common/components/Button/Button";
import { StyledJob } from "./JobStyles";
import { useDispatch } from "react-redux";
import { showJobsModal } from "../../../redux/slices/Modals/modalSlice";
import { setJobState } from "../../../redux/slices/Jobs/jobsSlice";
import { formatDate } from "../../../common/utils";

const Job = ({ job }) => {
  const dispatch = useDispatch();

  const onUpdateJobState = (response) => {
    dispatch(setJobState({ id: job.id, status: response }));
    dispatch(showJobsModal(true));
  };

  return (
    <StyledJob>
      <div className="text">
        <h4>{`requested as: ${job.profession}`}</h4>
        <Text size={"16px"}>{`${job.message} from ${formatDate(
          job.begin_date
        )} to ${formatDate(job.end_date)}`}</Text>
      </div>
      <div className="buttons">
        <Button callBack={() => onUpdateJobState('accepted')}>Accept</Button>
        <Button className={"reject"} callBack={() => onUpdateJobState('rejected')}>Reject</Button>
      </div>
    </StyledJob>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Job;
