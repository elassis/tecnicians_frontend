import styled from "styled-components";
import { green100 } from "../../constants/colors";

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.34);
  z-index: 1;
`;
export const ModalBody = styled.div`
  position: relative;
  width: 90vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 5px 15px 15px 15px;
  margin: 15px auto;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 15px;
  box-sizing: border-box;

  input[name="user_name"] {
    pointer-events:none;
  }

  .heading{
    display:flex;
    justify-content:space-between;
    
    button{
      background-color:#fff;
      color: ${green100};
    }
  }

  @media (min-width:700px){
    width:400px;
  }

`;
