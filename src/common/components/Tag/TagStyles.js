import styled from "styled-components";
import Text from "../Text/Text";

export const StyledTag = styled(Text)`
  max-width:250px;
  max-height:40px;
  font-size: 14px;
  border-radius:25px;
  padding:10px 16px;
  background-color:${props => props.backgroundColor};
  margin:8px auto;
  box-sizing:border-box;
  text-transform:capitalize;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
`;