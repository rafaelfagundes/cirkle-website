import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";

const StyledRadioButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  min-height: 38px;
`;

const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 8px;
  background-color: ${Colors.WHITE};
`;

const Box = styled.div<{ filled: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${(props) => (props.filled ? Colors.PRIMARY : "#bbb")};
  background-color: ${(props) =>
    props.filled ? Colors.PRIMARY : "transparent"};
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RadioButton {
  onClick: () => void;
  value: boolean;
}

function RadioButton(props: RadioButton): JSX.Element {
  return (
    <StyledRadioButton onClick={props.onClick}>
      <Box filled={props.value}>{props.value && <Circle></Circle>}</Box>
    </StyledRadioButton>
  );
}

export default RadioButton;
