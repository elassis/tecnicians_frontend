import styled from "styled-components";

export const StyledEditProfessionsModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .profession-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    p {
      width: 80%;
      margin: 0;
    }
     button {
      width: 100px;
     }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .select {
      div{
        max-width:100%;

      }
    }

  }
  
  .edit_profession_button{
    padding:12px 10px;
  }
`;
