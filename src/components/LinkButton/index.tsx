import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledLinkButton = styled.a<{ color: string }>`
  font-family: Commissioner, Lato, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : Colors.BLUE_JEANS)};
  flex: 1;

  &:hover {
    text-decoration: underline;
  }
`;

interface LinkButtonProps {
  children: string;
  color?: string;
  onClick: () => void;
}

function LinkButton(props: LinkButtonProps): JSX.Element {
  return (
    <StyledLinkButton onClick={props.onClick} color={props.color}>
      {props.children}
    </StyledLinkButton>
  );
}

export default LinkButton;
