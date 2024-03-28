import React from "react";
import PropTypes from "prop-types";
import Text from "../../../common/components/Text/Text";
import { StyledFeedbackBox } from "./FeedBackStyles";
import StarRatings from "react-star-ratings";

const Feedback = ({ job }) => {
  return (
    <StyledFeedbackBox className={"feedback_box"} key={job.id}>
      <Text className={"worked_as"} children={`Worked as: ${job.profession}`} />
      <StarRatings
        rating={job.ranking || 0}
        starDimension="15px"
        starSpacing="15px"
        starRatedColor="#ccc000"
      />
      <Text className={"comments"} children={job.comments || "No comments"} />
    </StyledFeedbackBox>
  );
};


Feedback.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Feedback;
