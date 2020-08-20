import React from "react";
import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

function Row({ children }: { children: Array<JSX.Element> }): JSX.Element {
  return <StyledRow>{children}</StyledRow>;
}

export default Row;
