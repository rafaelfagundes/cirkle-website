import React from "react";
import styled from "styled-components";

const Logo = styled.img<{ width: number }>`
  width: ${(props) => props.width}px;
  cursor: pointer;
`;

function HorizontalLogo({
  light,
  width = 96,
}: {
  light?: boolean;
  width?: number;
}): JSX.Element {
  return (
    <Logo
      width={width}
      src={light ? "/images/light_logo.svg" : "/images/logo.svg"}
    ></Logo>
  );
}

export default HorizontalLogo;
