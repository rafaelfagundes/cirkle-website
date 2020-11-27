import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Icon from "../Icon";

const StyledIconButton = styled.div<{
  size: number;
  filled: boolean;
  border: boolean;
  color: string;
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.border ? `2px solid ${props.color || Colors.PRIMARY}` : "none"};
  border-radius: 4px;
  background-color: ${(props) => (props.filled ? props.color : "transparent")};
`;

interface IconButtonProps {
  type: string;
  light?: boolean;
  alt?: string;
  size?: number;
  onClick: () => void;
  border?: boolean;
  color?: string;
  filled?: boolean;
}

function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <StyledIconButton
      onClick={props.onClick}
      size={props.size ? props.size * 1.375 : 44}
      border={props.border}
      filled={props.filled}
      color={props.color}
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
