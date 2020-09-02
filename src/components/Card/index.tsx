import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledCard = styled.div<{ padding: boolean }>`
  margin: 0;
  padding: ${(props) => (props.padding ? "16px" : 0)};
  display: flex;
  flex-direction: column;
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

type CardProps = {
  children: JSX.Element | Array<JSX.Element>;
  padding?: boolean;
};

function Card({ children, padding = true }: CardProps): JSX.Element {
  return <StyledCard padding={padding}>{children}</StyledCard>;
}

export default Card;
