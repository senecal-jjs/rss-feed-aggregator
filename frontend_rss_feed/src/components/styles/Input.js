import styled from "styled-components";

const StackedInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid slateblue;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border: 2px solid darkslateblue;
  }
`

export default StackedInput;