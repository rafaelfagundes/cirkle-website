import React from "react";
import styled from "styled-components";

const StyledPadding = styled.div<{
  horizontal: number;
  vertical: number;
}>`
  padding-left: ${(props) => props.horizontal}px;
  padding-right: ${(props) => props.horizontal}px;
  padding-top: ${(props) => props.vertical}px;
  padding-bottom: ${(props) => props.vertical}px;
`;

function Padding({
  children,
  horizontal = 0,
  vertical = 0,
}: {
  children: JSX.Element;
  horizontal?: number;
  vertical?: number;
}): JSX.Element {
  return (
    <StyledPadding horizontal={horizontal} vertical={vertical}>
      {children}
    </StyledPadding>
  );
}

export default Padding;
