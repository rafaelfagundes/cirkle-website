import React from "react";
import styled from "styled-components";
import Icon from "../Icon";

const StyledIconButton = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IconButtonProps {
  type: string;
  light?: boolean;
  alt?: string;
  size?: number;
  onClick: () => void;
}

function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <StyledIconButton
      onClick={props.onClick}
      size={props.size ? props.size * 1.375 : 44}
    >
      <Icon
        type={props.type}
        light={props.light}
        alt={props.alt}
        size={props.size}
        onClick={props.onClick}
      ></Icon>
    </StyledIconButton>
  );
}

export default IconButton;
