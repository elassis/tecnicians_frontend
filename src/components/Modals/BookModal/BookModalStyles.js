import styled from "styled-components";

export const StyledBookModal = styled.div`
  form{
    width:100%;
    height:100%;
    display:flex;
    gap:15px;
    flex-direction:column;
    justify-content:flex-start;
    box-sizing:border-box;
  }
  
  input , button {
    text-transform:capitalize;
  }

  .dates {
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:flex-start;
    box-sizing:border-box;
    
    .dateInput {
      width:100%;
      display:flex;
      gap:10px;
      margin-bottom:10px;

      p {
        width:10%;
      }
      div  {
        flex-grow:1;
        p {
          width:100%;
        }
      }
    }
    
    input {
      text-transform:lowercase;
    }
    
  }

  button {
    width: 100px;
    padding:13px 10px;
    margin: 0 auto;
    font-size:16px;
    font-weight:700;
  }

`;