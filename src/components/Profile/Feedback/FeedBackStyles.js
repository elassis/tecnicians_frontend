import styled from "styled-components";

export const StyledFeedbackBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .worked_as,
  .comments {
    width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .comments {
    width: 300px;
    max-height: 60px;
    white-space: wrap;
  }

  @media (min-width: 700px) {
    align-items: flex-start;

    .comments {
      width: 600px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;