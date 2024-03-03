import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 5px 16px;
  border:none;
  border-radius:16px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
`;