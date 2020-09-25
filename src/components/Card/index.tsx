import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledCard = styled.div<{ padding: boolean; bgColor: string }>`
  margin: 0;
  padding: ${(props) => (props.padding ? "16px" : 0)};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgColor};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

type CardProps = {
  children: JSX.Element | Array<JSX.Element>;
  padding?: boolean;
  bgColor?: string;
};

function Card(props: CardProps): JSX.Element {
  return (
    <StyledCard
      bgColor={props.bgColor || Colors.WHITE}
      padding={props.padding || true}
    >
      {props.children}
    </StyledCard>
  );
}

export default Card;
