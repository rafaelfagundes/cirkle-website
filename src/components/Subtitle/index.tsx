import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledSubtitle = styled.h2<{ color: string; size: number }>`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 400;
  font-size: ${(props) => props.size}px;
  line-height: 18px;
  letter-spacing: -0.0055em;
  text-align: center;
  color: ${(props) => props.color};
  margin: 0;
`;

function Subtitle({
  children,
  color = Colors.PRIMARY,
  size = 16,
}: {
  children: string;
  color?: string;
  size?: number;
}): JSX.Element {
  return (
    <StyledSubtitle color={color} size={size}>
      {children}
    </StyledSubtitle>
  );
}

export default Subtitle;
