import React from "react";
import styled from "styled-components";

const StyledRow = styled.div<{ spaceBetween: boolean; alignTop: boolean }>`
  display: flex;
  flex: 1;
  align-items: ${(props) => (props.alignTop ? "flex-start" : "center")};
  flex-direction: row;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "flex-start"};
`;

function Row({
  children,
  spaceBetween = false,
  alignTop = false,
  ...props
}: {
  children: JSX.Element | Array<JSX.Element>;
  spaceBetween?: boolean;
  alignTop?: boolean;
}): JSX.Element {
  return (
    <StyledRow {...props} spaceBetween={spaceBetween} alignTop={alignTop}>
      {children}
    </StyledRow>
  );
}

export default Row;
