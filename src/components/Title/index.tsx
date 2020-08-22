import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledTitle = styled.span<{ color: string }>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.055em;
  text-transform: uppercase;

  color: ${(props) => props.color};
`;

function Title({
  children,
  color = Colors.PRIMARY,
}: {
  children: string;
  color?: string;
}): JSX.Element {
  return <StyledTitle color={color}>{children}</StyledTitle>;
}

export default Title;
