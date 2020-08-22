import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledSubtitle = styled.span`
  font-family: FuturaPT;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.0055em;
  text-align: center;

  color: ${Colors.PRIMARY};
`;

function Subtitle({ children }: { children: string }): JSX.Element {
  return <StyledSubtitle>{children}</StyledSubtitle>;
}

export default Subtitle;
