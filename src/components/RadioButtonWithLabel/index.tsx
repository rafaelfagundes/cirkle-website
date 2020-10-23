import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import SimpleText from "../SimpleText";

const StyledRadioButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  min-height: 38px;

  &:hover {
    background-color: #eee;
    padding: 0 8px 0 8px;
    margin: 0px -8px 0px -8px;
  }

  &:active {
    background-color: ${Colors.TEA_GREEN};
  }
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
    props.filled ? Colors.PRIMARY : Colors.WHITE};
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 5px;
`;

interface RadioButtonWithLabel {
  label: string;
  onClick: () => void;
  value: boolean;
}

function RadioButtonWithLabel(props: RadioButtonWithLabel): JSX.Element {
  return (
    <StyledRadioButton onClick={props.onClick}>
      <Box filled={props.value}>{props.value && <Circle></Circle>}</Box>
      <SimpleText size={0.9}>{props.label}</SimpleText>
    </StyledRadioButton>
  );
}

export default RadioButtonWithLabel;
