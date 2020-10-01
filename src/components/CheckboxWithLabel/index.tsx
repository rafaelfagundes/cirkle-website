import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
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
    background-color: #eee;
    padding: 0 8px 0 8px;
    margin: 0px -8px 0px -8px;
  }

  &:active {
    background-color: ${Colors.TEA_GREEN};
  }
`;

const Box = styled.div<{ filled: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${(props) => (props.filled ? Colors.PRIMARY : "#bbb")};
  background-color: ${(props) =>
    props.filled ? Colors.PRIMARY : "transparent"};

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 8px;
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
      <SimpleText>{props.label}</SimpleText>
    </StyledCheckBox>
  );
}

export default CheckBoxWithLabel;
