import styled from "styled-components";
import { green100 } from "../../../common/constants/colors";

export const StyledSection = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #eee;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);
  -moz-box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);
  box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);

  img {
    margin-bottom: 20px;
  }

  .address {
    width: 300px;
    max-height: 60px;
    overflow: hidden;
  }

  .feedback_box:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  .header { 
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:15px;

    .title {
      width:90%;
      text-align:left;
      margin: 0;
      color: ${green100};
      font-weight: 700;
      font-size: 20px;
    }

    button {
      width:70px;
      margin:0;
      padding:10px 5px;
    }
  }

  > div > div > .name {
    max-width: 250px;
    overflow: hidden;
    margin:auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: capitalize;
  }
  
  @media (min-width: 700px) {
    width: 50%;
    align-items: flex-start;
    
    > div > div > .email {
      margin-bottom:0;
    }

    > div > div > .start_date { 
      margin: 0;
    }

    .content {
      display: flex;
      width: 100%;
    }

    > div > div > .name {
      margin:0;
    }
  }
`;

export const FirstColumn = styled.div`
  @media (min-width: 700px) {
    min-width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
  }
`;

export const SecondColumn = styled.div`
  @media (min-width: 700px) {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
    gap:10px;

    .name{
      margin:0;
    }
  }
`;
export const ThirdColumn = styled.div`
  

`;
