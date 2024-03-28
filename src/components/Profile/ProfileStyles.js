import styled from "styled-components";
import { green100 } from "../../common/constants/colors";

export const StyledSection = styled.div`
  width: 100%;
  margin: 20px auto;
  display: ${props => props.display === true ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #eee;
  box-sizing: border-box;
  -webkit-box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);
  -moz-box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);
  box-shadow: 0px 9px 15px -9px rgba(174, 194, 189, 1);

  img {
    margin-bottom: 20px;
  }

  .name {
    max-width: 250px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 15px auto;
    text-transform:capitalize;
  }

  .address {
    width: 300px;
    max-height: 60px;
    overflow: hidden;
  }

  .feedback_box:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  .professional-col {
    > .title {
      margin-bottom: 20px;
    }
  }

  .title {
    margin: 0 auto 10px auto;
    color: ${green100};
  }

  @media (min-width: 700px) {
    width: 50%;
    flex-direction: row;
    align-items: flex-start;
    

    .first-col {
      width:20%;
    }

    .second-col {
      width:70%;
    }
    
    .third-col {
      width:10%;

      > button {
        width:70px;
      }
    }

    .first-col,
    .second-col, .third-col {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: left;

      > .title {
        margin: 0;
      }

      > .name {
        text-align: left;
        margin: 15px 0;
      }
    }

    .feedback-col {
      width: 100%;
    }

    .professional-col {
      width: 100%;

      .prof-tags {
        margin-top: 15px;
        display: flex;
        gap: 10px;
        p {
          margin: 0;
        }
      }
    }
  }

`;

export const StyledBackButton = styled.div`
  margin: 16px auto;
  width:100px;
  a {
    display:block;
    width:100%;
    font-weight:700;
    padding:8px 16px;
    text-decoration: none;
    background-color: ${green100};
    color: #fff;
    border-radius:16px;
  }

  @media (min-width:700px){
    margin:16px 0% 16px 25%;
  }
`;
