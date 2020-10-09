import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledTitle = styled.h1<{
  color: string;
  size: number;
  bold: boolean;
}>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  font-size: ${(props) => props.size}px;
  line-height: ${(props) => props.size * 1.14}px;
  letter-spacing: -0.005em;
  text-transform: uppercase;
  margin: 0;

  color: ${(props) => props.color};
`;

function Title({
  children,
  color = Colors.PRIMARY,
  size = 16,
  bold = true,
}: {
  children: string;
  color?: string;
  size?: number;
  bold?: boolean;
}): JSX.Element {
  return (
    <StyledTitle color={color} size={size} bold={bold}>
      {children}
    </StyledTitle>
  );
}

export default Title;
