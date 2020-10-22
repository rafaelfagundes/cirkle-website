import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const BadgeHolder = styled.div<{ position: string }>`
  background-color: ${Colors.SECONDARY};
  width: 21px;
  height: 21px;
  display: flex;
  flex-direction: "row";
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  position: absolute;
  border: 2px solid ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  ${(props) => props.position};
`;

const Text = styled.div`
  color: ${Colors.WHITE};
  font-family: Commissioner;
  text-transform: uppercase;
  letter-spacing: -1px;
  font-size: 12px;
  font-weight: 700;
`;

export enum BadgePosition {
  TOP_LEFT = "top: 0; left: 0; margin-left: -5px;",
  LEFT = "left: 0; margin-left: -5px;",
  BOTTOM_LEFT = "bottom: 0; left: 0; margin-left: -5px;",
  CENTER = "",
  TOP_RIGHT = "top: 0; right: 0; margin-right: -5px;",
  RIGHT = "right: 0; margin-right: -5px;",
  BOTTOM_RIGHT = "bottom: 0; right: 0; margin-right: -5px;",
}

function Badge({
  children,
  position,
}: {
  children: string;
  position: BadgePosition;
}): JSX.Element {
  if (children === "0") return <></>;
  return (
    <BadgeHolder position={position}>
      <Text>{children}</Text>
    </BadgeHolder>
  );
}

export default Badge;
