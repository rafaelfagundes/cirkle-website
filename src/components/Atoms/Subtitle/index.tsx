import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";

const StyledSubtitle = styled.h2<{
  color: string;
  size: number;
  bold: boolean;
}>`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: ${(props) => (props.bold ? "700" : "500")};
  font-size: ${(props) => props.size}px;
  line-height: 18px;
  letter-spacing: -0.0055em;
  color: ${(props) => props.color};
  margin: 0;
`;

function Subtitle({
  children,
  color = Colors.PRIMARY,
  size = 16,
  bold = false,
}: {
  children: string;
  color?: string;
  size?: number;
  bold?: boolean;
}): JSX.Element {
  return (
    <StyledSubtitle color={color} size={size} bold={bold}>
      {children}
    </StyledSubtitle>
  );
}

export default Subtitle;
