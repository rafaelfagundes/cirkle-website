import React from "react";
import styled from "styled-components";

const Logo = styled.img<{ width: number }>`
  width: ${(props) => props.width}px;
  cursor: pointer;
`;

function HorizontalLogo({
  light,
  width = 96,
  onClick,
  ...props
}: {
  light?: boolean;
  width?: number;
  onClick?: () => void;
}): JSX.Element {
  return (
    <Logo
      {...props}
      width={width}
      src={light ? "/images/light_logo.svg" : "/images/logo.svg"}
      onClick={onClick}
    ></Logo>
  );
}

export default HorizontalLogo;
