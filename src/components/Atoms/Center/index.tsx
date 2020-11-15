import React from "react";
import styled from "styled-components";

const StyledCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function Center({ children }: { children: JSX.Element }): JSX.Element {
  return <StyledCenter>{children}</StyledCenter>;
}

export default Center;
