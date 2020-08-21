import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledSubtitle = styled.span`
  font-family: Raleway;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.055em;

  color: ${Colors.PRIMARY};
`;

function Subtitle({ children }: { children: string }): JSX.Element {
  return <StyledSubtitle>{children}</StyledSubtitle>;
}

export default Subtitle;
