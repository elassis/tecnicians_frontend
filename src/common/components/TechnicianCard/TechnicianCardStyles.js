import styled from "styled-components";
import { green100 } from "../../constants/colors";

export const StyledTechnicianCard = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  height: 500px;
  padding: 15px;
  margin: 15px auto;
  border: 1px solid #eee;
  border-radius: 15px;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);
  -moz-box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);
  box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);

  .img-area,
  .text-area,
  .buttons-area {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > .img-area {
    height: 180px;
    img {
      width: 130px;
      height: 130px;
      border: 1px solid ${green100};
      border-radius: 50%;
    }
  }

  > div > .text-area {
    flex-direction: column;
    height: 250px;

    .title,
    .rating,
    .professions {
      display: flex;
    }

    .title {
      text-transform:capitalize;
      height: 70px;
      @media (min-width:700px){
        width:100%;
        height: 30px;
        justify-content:flex-start;
        align-items: center;
         p{
          margin:0;
         }
      }
    }

    .professions {
      flex-wrap: wrap;
      padding: 15px 0 0 0;
      height: 150px;
      gap: 7px;
      overflow:auto;

      @media (min-width:700px){
        width:100%;
        padding:0;
        height: 120px;
        justify-content:flex-start;
        align-items:flex-start;
        p{
          margin:0;          
        }
      }
    }

    @media (min-width:700px){
      width:100%;
      height:200px;
      gap:10px;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  > div > .buttons-area {
    gap: 15px;
    height: 70px;
    button {
      width: 150px;
      padding: 10px;
      font-size: 16px;
      margin: auto;

      @media (min-width:700px){
        margin:0;
      }
    }
    @media (min-width:700px){
     justify-content:flex-start;
     padding: 0;

    }
  }

  @media (min-width:700px) {
    width:550px;
    height:300px;
    flex-direction:row;
    gap:15px;
    .img-area {
      width:30%;
    }
    .second-column{
      width:70%;
      height:100%;
    }
    
  }
`;
