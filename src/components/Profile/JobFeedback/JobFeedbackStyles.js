import styled from "styled-components";
import { green100 } from "../../../common/constants/colors";

export const StyledJobFeedback = styled.div`
  min-width:300px;
  margin-top:15px;
  .tabs {
    width:100%;
    display:flex;
    gap:10px;
    
    button {
      border-radius: 8px 8px 0 0;
      background-color:#fff;
      color: ${green100};
      border-style: solid;
      border-width: 1px;
      border-top-color:  ${green100};
      border-right-color:  ${green100};
      border-bottom-color: #fff;
      border-left-color:  ${green100};
    }

    .selected-tab {
      background-color:${green100};
      color:#fff;
      font-weight:700;
    }
  }  
`;