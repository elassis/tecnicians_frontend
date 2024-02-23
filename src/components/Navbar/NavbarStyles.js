import styled from "styled-components";

export const StyledNavbar = styled.nav`
  width: auto;
  height: 50px;
  display: flex;
  background-color: #00994c;
  padding: 0 20px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);
  box-shadow: 0px 0px 5px 0px rgba(117,117,117,1);

  > .desktop-layout {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    font-weight:700 !important;
    color: #fff !important;
  }

  > .hamburger-icon {
    display:flex;
    flex-direction:column;
    gap:3px;
    justify-content:center;
    align-items:center;
    div {
      width: 30px;
      height: 5px;
      border-radius: 16px;
      background-color: #fff;
    }
  }
`;
