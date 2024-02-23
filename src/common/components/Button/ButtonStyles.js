import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 16px;
  border:none;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
`;