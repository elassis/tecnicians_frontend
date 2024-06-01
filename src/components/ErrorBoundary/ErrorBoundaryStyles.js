import styled from "styled-components";

export const ErrorContainer = styled.div`
 width: 300px;
 display:flex;
 flex-direction:column;
 margin: 20px auto;
 padding: 20px;
 border: 1px solid #eee;
 border-radius: 16px;
 
 .title {
  border-bottom:1px solid #eee;
  padding-bottom:20px;
 }

 p{
  margin-top:-3px;
 }
`;