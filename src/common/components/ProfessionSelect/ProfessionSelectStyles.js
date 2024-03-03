import styled from "styled-components";
import { green100 } from "../../constants/colors";

export const StyledProfessionSelect = styled.div`
  max-width: 300px;
  max-height: 50px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #eee;
  border-radius: 16px;
  padding-right: 15px;

  select,
  input {
    border: none;
  }

  .profession-select {
    width: 60%;
  }

  .profession-input {
    width: 40%;
  }

  span {
    color: ${green100};
    font-weight: 700;
    cursor: pointer;
  }
`;
