import React from "react";
import PropTypes from "prop-types";
import Text from "../../../common/components/Text/Text";
import {
  StyledSection,
  FirstColumn,
  SecondColumn,
  ThirdColumn,
} from "./SectionStyles";

const Section = ({
  classname,
  title,
  firstRowChildren,
  secondRowChildren,
  thirdRowChildren,
  button,
}) => {
  return (
    <StyledSection className={classname}>
      <div className="header">
        <Text className={"title"}>{title}</Text>
        {button}
      </div>
      <div className="content">
        {firstRowChildren && <FirstColumn>{firstRowChildren}</FirstColumn>}
        {secondRowChildren && <SecondColumn>{secondRowChildren}</SecondColumn>}
        {thirdRowChildren && <ThirdColumn>{thirdRowChildren}</ThirdColumn>}
      </div>
    </StyledSection>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  firstRowChildren: PropTypes.any,
  secondRowChildren: PropTypes.any,
  thirdRowChildren: PropTypes.any,
  classnames: PropTypes.object,
};

Section.default = {
  classname: null,
  firstRowChildren: null,
  secondRowChildren: null,
  thirdRowChildren: null,
};

export default Section;
