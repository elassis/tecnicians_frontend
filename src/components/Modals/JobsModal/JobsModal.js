import React, { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../../apis/ApiActions";
import { UPDATE_JOB } from "../../../apis/jobsApi";
import { setErrors } from "../../../redux/slices/Errors/errorsSlice";
import Text from "../../../common/components/Text/Text";
import Tag from "../../../common/components/Tag/Tag";
import Button from "../../../common/components/Button/Button";
import { showJobsModal } from "../../../redux/slices/Modals/modalSlice";
import { setResponse } from "../../../redux/slices/Response/responseSlice";
import { StyledRejectQuestion } from "./JobsModalStyles";
import SuccessModal from "../SuccessModal";
/**
 * MODAL's PROCCESS
 *
 * read jobs status
 *  if status accepted:
 *      - update job to accepted in database
 *      - should display message: job accepted, client
 *        will be in touch with you in no time!
 *  if rejected:
 *     - should display warning: are u sure of reject this job?
 *        if click yes:
 *         - update job's status to reject
 *         - show message 'job successfully rejected'
 *         - modal autoclose
 *
 */

const RejectWarning = ({ reject, cancel, response }) => {
  return (
    <>
      {response !== null ? (
        <SuccessModal response={{data: response}}/>
      ) : (
        <StyledRejectQuestion>
          <Text className={"confirm_reject_question"}>
            Are you sure about rejecting this job?
          </Text>
          <div className="buttons">
            <Button callBack={cancel}>Cancel</Button>
            <Button callBack={reject}>Yes</Button>
          </div>
        </StyledRejectQuestion>
      )}
    </>
  );
};

const AcceptJob = ({ response }) => {
  return (
    <StyledRejectQuestion>
      <Tag className="accepted_text">
        {response !== null && response === 200
          ? "great!, client will be in touch soon."
          : "...accepting"}
      </Tag>
    </StyledRejectQuestion>
  );
};
const JobsModal = (props) => {
  const { job } = useSelector((state) => state.jobs);
  const [responseStatus, setResponseStatus] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (job.status === "accepted") {
      onUpdateJob("accepted");
    }
  }, [job]);

  useEffect(() => {
    if (responseStatus !== null) {
      const timer = setTimeout(() => {
        dispatch(showJobsModal(false));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseStatus]);

  const actions = {
    success: setResponse,
    failure: setErrors,
    responseChange: setResponseStatus,
  };

  const onUpdateJob = (newStatus) => {
    const url = UPDATE_JOB.replace("id", job.id);
    updateData(url, { status: newStatus }, dispatch, actions);
  };

  return job && job.status === "rejected" ? (
    <RejectWarning
      response={responseStatus}
      reject={() => onUpdateJob("rejected")}
      cancel={() => dispatch(showJobsModal(false))}
    />
  ) : job.status === "accepted" ? (
    <AcceptJob response={responseStatus} />
  ) : (
    ""
  );
};

JobsModal.propTypes = {
  jobId: PropTypes.string,
};

JobsModal.defaultProps = {
  jobId: null,
};

export default JobsModal;
