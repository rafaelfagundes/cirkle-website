import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledTitle = styled.span`
  font-family: Raleway;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.055em;
  text-transform: uppercase;

  color: ${Colors.PRIMARY};
`;

function Title({ children }: { children: string }): JSX.Element {
  return <StyledTitle>{children}</StyledTitle>;
}

export default Title;
