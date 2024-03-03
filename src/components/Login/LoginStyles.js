import styled from "styled-components";

export const StyledLogin = styled.div`
  padding:0 15px;
  width:${props => props.$isMobile ? '100%' : '400px'};
  margin:auto;
  text-align:center;
  box-sizing:border-box;

  > form {
    display:flex;
    flex-direction:column;
    gap:10px;

    button {
      width:150px;
      margin:15px auto;
      padding:13px 0;
      font-size:16px;
      font-weight:700;
    }
  }

`;