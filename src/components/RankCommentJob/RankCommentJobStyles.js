import styled from "styled-components";
import { green50 } from "../../common/constants/colors";

export const StyledRankComment = styled.div`
  width:350px;
  margin:20px auto;
  box-sizing:border-box;
  border-radius:20px;
  -webkit-box-shadow: 0px 8px 24px -10px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 8px 24px -10px rgba(0,0,0,0.75);
box-shadow: 0px 8px 24px -10px rgba(0,0,0,0.75);
  
  .heading{
    padding:20px;
    margin-top:0;
    border-radius:20px 20px 0 0;
    background-color:${green50};

    p{
      margin:0;
      padding: 0 0 5px 0;
    }
    
    >.excert {
      font-size:14px;
      line-height:20px;
    }
  }

  
  .error-message {
    text-align:center;
  }
  
  .error-message::first-letter, .excert::first-letter{
    text-transform:capitalize;
  }

  form {
    width:100%;
    display:flex;
    flex-direction:column;
    gap:20px;
    padding:30px 20px 20px 20px;
    box-sizing:border-box;

    input::placeholder, textarea::placeholder  {
        text-transform:capitalize;
      
    }
    button{
      padding:15px 20px;

    }
  }

`;