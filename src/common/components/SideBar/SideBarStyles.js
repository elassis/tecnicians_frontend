import styled from "styled-components";
import { green100 } from "../../constants/colors";

export const StyledSideBar = styled.div`
  width: 300px;
  height: 100vh;
  position: absolute;
  background-color: #ffffff;
  margin-top: -50px;
  margin-left: ${props => props.$marginLeft};
  z-index: 10;
  transition: margin 1s;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);
  box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);

  > .sidebar-header {
    width:100%;
    padding-left: 15px;
    display:flex;
    align-items:center;
    justify-content: space-between;
    box-sizing:border-box;
    border-bottom: 1px solid #eeeeee;
  }

  > .buttons-section {
    width:100%;
    padding-top:15px;
    padding-left: 15px;
    display:flex;
    flex-direction: column;
    gap:15px;

    > a {
      text-decoration: none;
      color: ${green100};
    }
  }
`;
