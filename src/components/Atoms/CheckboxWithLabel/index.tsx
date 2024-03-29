import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Icon from "../Icon";
import SimpleText from "../SimpleText";

const StyledCheckBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  height: 38px;

  &:hover {
    background-color: #fbeff7;
    padding: 0 8px 0 8px;
    margin: 0px -8px 0px -8px;
    border-radius: 8px;
  }
`;

const Box = styled.div<{ filled: boolean }>`
  width: 18px;
  height: 18px;
  border: 2px solid ${(props) => (props.filled ? Colors.PRIMARY : "#bbb")};
  background-color: ${(props) =>
    props.filled ? Colors.PRIMARY : Colors.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border-radius: 4px;
`;

interface CheckBoxWithLabelProps {
  label: string;
  onClick: () => void;
  value: boolean;
}

function CheckBoxWithLabel(props: CheckBoxWithLabelProps): JSX.Element {
  return (
    <StyledCheckBox onClick={props.onClick}>
      <Box filled={props.value}>
        {props.value && (
          <Icon type="checkmark" size={12} onClick={() => null}></Icon>
        )}
      </Box>
      <SimpleText size={0.9}>{props.label}</SimpleText>
    </StyledCheckBox>
  );
}

export default CheckBoxWithLabel;
