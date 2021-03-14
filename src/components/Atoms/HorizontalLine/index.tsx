import React from "react";
import styled from "styled-components";

const StyledHorizontalLine = styled.div<{ color: string }>`
  padding: 0;
  margin: 0;
  height: 1px;
  background-color: ${(props) => props.color};
  width: 100%;
`;

function HorizontalLine({ color = "#fbeff7" }: { color: string }): JSX.Element {
  return <StyledHorizontalLine color={color}></StyledHorizontalLine>;
}

export default HorizontalLine;
