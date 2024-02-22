import styled from "styled-components";

export const StyledNavbar = styled.nav`
  width: auto;
  height: 50px;
  display: flex;
  background-color: #00994c;
  padding: 0 20px;

  > .desktop-layout {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    font-weight: 700;
    color: #fff;
  }
`;
