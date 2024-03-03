import React from "react";
import Container from "../../common/components/Container/Container";
import Text from "../../common/components/Text/Text";
import { SITE_TITLE } from "../../common/constants/titles";
import { StyledLandingPage } from "./LandingPageStyles";
import { useDevice } from "../../common/hooks/useDevice";

const LandingPage = () => {
  const { isMobile } = useDevice();
  return (
    <Container>
      <StyledLandingPage isMobile={isMobile}>
        {isMobile && <h1>{SITE_TITLE}</h1>}
        <div className="img-container">
          <img
            alt="landing_page_img"
            src={
              "https://goodbeeplumbinganddrains.com/wp-content/uploads/2023/01/iStock-1341381755-1024x683.jpg"
            }
          />
        </div>
        <Text style={{ maxWidth: "600px" }}>
          Welcome to TechFreelance, your one-stop destination for all your
          handyman needs and beyond. Whether you're a seasoned professional
          looking for your next gig or a homeowner in search of reliable help
          for your household tasks, TechFreelance has you covered.
        </Text>
      </StyledLandingPage>
    </Container>
  );
};

export default LandingPage;
