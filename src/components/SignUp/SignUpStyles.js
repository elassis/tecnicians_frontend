import styled from "styled-components";
import { green100 } from "../../common/constants/colors";


export const StyledSignUp = styled.div`
  width:300px;
  margin:auto;
  display:flex;
  flex-direction:column;
  align-items:center;

  > form {
    width:100%;
    display:flex;
    flex-direction:column;
    gap:15px;
  
    label {
      display:flex;
      gap: 15px;
    }

    fieldset{
      display:flex;
      flex-direction:column;
      gap:15px;

      legend, label, .professions_label {
        color:${green100};
        font-weight: 700;
      }
    }
    .professions_label {
      color:${green100};
      font-weight: 700;
    }

    .professions_list {
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      justify-content:flex-start;
    }

    button {
      width:150px;
      margin:15px auto;
      padding:13px 0;
      font-size:16px;
      font-weight:700;
    }
  }

  @media (min-width:700px){
    width:1000px;
    form {
      flex-direction:row;
      flex-wrap:wrap;
    }
    form > div {
      min-width: 300px;
    }
    form > fieldset {
      width:90%;
      flex-direction:row;      
      flex-wrap:wrap;
    }

    form > fieldset > div {
      width:30%;
    }

    .professions_label, .professions_list {
      width:100%;
    }
    .profession_wrapper {
      display:flex;
      flex-direction:column;
    }
  }
`;