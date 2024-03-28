import React from "react";
import PropTypes from "prop-types";
import { StyledTechnicianCard } from "./TechnicianCardStyles";
import Text from "../Text/Text";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import StarRatings from "react-star-ratings";
import Avatar from "../Avatar/Avatar";

const TechnicianCard = ({
  imgUrl,
  first_name,
  last_name,
  professions,
  rankingAvg,
  callToActions,
  id,
  email,
}) => {

  const technicianData = {
    id,
    name: `${first_name} ${last_name}`,
    professions,
    email,
  }
  return (
    <StyledTechnicianCard>
      <div className="img-area">
        <Avatar src={imgUrl} alt="user_photo" />
      </div>
      <div className="second-column">
        <div className="text-area">
          <div className="title">
            <Text
              size={"22px"}
              weight={"700"}
            >{`${first_name} ${last_name}`}</Text>
          </div>
          <div className="technician_rating">
            <StarRatings
              rating={rankingAvg}
              starDimension="15px"
              starSpacing="15px"
              starRatedColor="#ccc000"
            />
          </div>
          <div className="professions">
            {professions &&
              professions.map((profession) => {
                return <Tag key={profession.id}>{profession.name}</Tag>;
              })}
          </div>
        </div>
        <div className="buttons-area">
          <Button callBack={() => callToActions.navigation(`/profile/${id}`)}>
            Profile
          </Button>
          <Button callBack={() => callToActions.showModal(technicianData)}>Contact</Button>
        </div>
      </div>
    </StyledTechnicianCard>
  );
};

TechnicianCard.propTypes = {
  imgUrl: PropTypes.string,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  professions: PropTypes.array.isRequired,
  rankingAvg: PropTypes.number.isRequired,
  callToActions: PropTypes.object.isRequired,
};

TechnicianCard.defaultProps = {
  imgUrl: null,
};

export default TechnicianCard;
