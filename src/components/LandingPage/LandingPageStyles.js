import styled from "styled-components";

export const StyledLandingPage = styled.div`
padding-top:${props => props.$isMobile ? '0px' : '20px'};
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

>.img-container {
  width: 100%;
  max-width:600px;
  height:auto;
  display: block;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius:16px;
  }
}

`;