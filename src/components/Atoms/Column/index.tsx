import React from "react";
import styled from "styled-components";

const StyledColumn = styled.div<{ spaceBetween: boolean; minHeight: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "flex-start"};

  ${(props) => (props.minHeight ? `min-height: ${props.minHeight}px` : "")}
`;

function Column({
  children,
  spaceBetween,
  minHeight,
}: {
  children: Array<JSX.Element>;
  spaceBetween?: boolean;
  minHeight?: number;
}): JSX.Element {
  return (
    <StyledColumn spaceBetween={spaceBetween} minHeight={minHeight}>
      {children}
    </StyledColumn>
  );
}

export default Column;
