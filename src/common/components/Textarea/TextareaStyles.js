import styled from "styled-components";

export const StyledTextarea = styled.textarea`
  padding:15px;
  width:100%;
  min-height:100px;
  border:1px solid #eee;
  border-radius:16px;
  box-sizing:border-box;

  @media (min-width:700px){
    min-height:200px;
  }
`;