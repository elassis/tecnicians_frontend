import styled from "styled-components";
import { green100 } from "../../common/constants/colors";

export const StyledBackButton = styled.div`
  margin: 16px auto;
  width:100px;
  a {
    display:block;
    width:100%;
    font-weight:700;
    padding:8px 16px;
    text-decoration: none;
    background-color: ${green100};
    color: #fff;
    border-radius:16px;
  }

  @media (min-width:700px){
    margin:16px 0% 16px 25%;
  }
`;
