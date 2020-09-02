import React from "react";
import styled from "styled-components";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function Column({ children }: { children: Array<JSX.Element> }): JSX.Element {
  return <StyledColumn>{children}</StyledColumn>;
}

export default Column;
