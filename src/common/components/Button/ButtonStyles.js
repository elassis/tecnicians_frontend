import styled from "styled-components";

export const StyledButton = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:7px;
  padding: 5px 16px;
  border:none;
  border-radius:16px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
`;