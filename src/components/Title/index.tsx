import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const StyledTitle = styled.span<{ color: string; size: number }>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: bold;
  font-size: ${(props) => props.size}px;
  line-height: 16px;
  letter-spacing: -0.005em;
  text-transform: uppercase;

  color: ${(props) => props.color};
`;

function Title({
  children,
  color = Colors.PRIMARY,
  size = 14,
}: {
  children: string;
  color?: string;
  size?: number;
}): JSX.Element {
  return (
    <StyledTitle color={color} size={size}>
      {children}
    </StyledTitle>
  );
}

export default Title;
