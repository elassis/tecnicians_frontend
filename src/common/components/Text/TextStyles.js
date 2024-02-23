import styled from "styled-components";

export const StyledText = styled.p`
  font-weight: ${(props) => props.$weight};
  font-size: ${(props) => props.size};
  color: ${props => props.$textColor};
`;
