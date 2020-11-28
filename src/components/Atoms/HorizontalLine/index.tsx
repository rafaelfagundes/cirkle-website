import React from "react";
import styled from "styled-components";

const StyledHorizontalLine = styled.div`
  padding: 0;
  margin: 0;
  height: 1px;
  background-color: #e3e3e3;
  width: 100%;
`;

function HorizontalLine(): JSX.Element {
  return <StyledHorizontalLine></StyledHorizontalLine>;
}

export default HorizontalLine;
