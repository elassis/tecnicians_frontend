import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../common/components/Button/Button";
import { StyledJobFeedback } from "./JobFeedbackStyles";
import Feedback from "../Feedback/Feedback";
import Job from "../Job/Job";
import Counter from "../../../common/components/Counter/Counter";
import { useSelector } from "react-redux";
import { isOwner } from "../../../common/utils";

const withList =
  (Component) =>
  ({ jobs }) => {
    return jobs.map((job) => {
      return <Component key={job.id} job={job} />;
    });
  };

const JobFeedback = (props) => {
  const { jobs, defaultTab } = props;
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const pendingJobs = jobs.filter((job) => job.status === "pending");
  const { user } = useSelector((state) => state);
  const { user_info } = useSelector((state) => state.technician.tech.data.data);
  const JobsList = withList(Job);
  const FeedbackList = withList(Feedback);

  const isUserOwner = isOwner(user.id, user_info.id);

  return (
    <StyledJobFeedback>
      <div className="tabs">
        <Button
          className={`${selectedTab === "feedback" ? "selected-tab" : ""}`}
          callBack={() => setSelectedTab("feedback")}
        >
          Feedback
        </Button>
        {isUserOwner && (
          <Button
            className={`${selectedTab === "jobs" ? "selected-tab" : ""}`}
            callBack={() => setSelectedTab("jobs")}
            children={"Jobs"}
            icon={
              pendingJobs.length > 0 ? (
                <Counter count={pendingJobs.length} />
              ) : null
            }
          />
        )}
      </div>
      <div className="content">
        {selectedTab === "jobs" && pendingJobs.length > 0 && isUserOwner && (
          <JobsList jobs={pendingJobs} />
        )}
        {selectedTab === "feedback" && <FeedbackList jobs={jobs} />}
      </div>
    </StyledJobFeedback>
  );
};

JobFeedback.propTypes = {
  jobs: PropTypes.array.isRequired,
  defaultTab: PropTypes.string.isRequired,
};

export default JobFeedback;
