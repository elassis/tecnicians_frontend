import styled from "styled-components";
import { green100, green50 } from "../../../common/constants/colors";

export const StyledJob = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${green50};
  margin-top:10px;
  border-radius:16px;

  > div.text {
    max-width: 300px;
    text-align: left;
    border-radius: 16px;
    padding: 15px;
    h4 {
      margin: 0;
      font-weight:500;
      max-width: 280px;
      max-height: 45px;
      overflow: hidden;

    }
    h4::first-letter {
      text-transform:capitalize;
    }
    p {
      margin: 5px 0 0 0;      
      max-height: 65px;
      overflow: hidden;
    }
    @media (min-width:700px){
      max-width: 580px;
    }
  }

  > .buttons {
    display: flex;
    gap: 10px;
    padding: 0 15px 15px 15px;
    button {
      padding: 8px 18px;
      font-weight:600;
    }

    .reject {
      background-color: #fff;
      color: ${green100};
    }
  }
`;
