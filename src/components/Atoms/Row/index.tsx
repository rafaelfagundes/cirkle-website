import React from "react";
import styled from "styled-components";

const StyledRow = styled.div<{ spaceBetween: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "flex-start"};
`;

function Row({
  children,
  spaceBetween = false,
  ...props
}: {
  children: Array<JSX.Element>;
  spaceBetween?: boolean;
}): JSX.Element {
  return (
    <StyledRow {...props} spaceBetween={spaceBetween}>
      {children}
    </StyledRow>
  );
}

export default Row;
