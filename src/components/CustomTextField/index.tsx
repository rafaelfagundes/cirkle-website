import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";
import SizedBox from "../SizedBox";

const StyledInput = styled.div<{ error: boolean }>`
  border: ${(props) => (props.error ? "3px" : "2px")} solid
    ${(props) => (props.error ? Colors.RADICAL_RED : Colors.PRIMARY)};
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
`;

const ErrorText = styled.span`
  font-family: FuturaPT;
  font-size: 16px;
  color: ${Colors.RADICAL_RED};
`;

const useStyles = makeStyles(() => ({
  input: {
    fontFamily: "FuturaPT",
    fontSize: 18,
  },
}));

type Props = {
  children: string;
  error?: string;
  type?: string;
};

function getConfig(type: string): { icon: string; inputType: string } {
  switch (type) {
    case "password":
      return { icon: "key", inputType: "password" };
    case "email":
      return { icon: "email", inputType: "email" };
    case "user":
      return { icon: "person", inputType: "text" };

    default:
      return { icon: null, inputType: "text" };
  }
}

const CustomTextField = React.forwardRef((props: Props, ref) => {
  const config = getConfig(props.type);

  return (
    <>
      <StyledInput
        error={
          props.error !== undefined &&
          props.error !== null &&
          props.error !== ""
        }
      >
        {config.icon && (
          <>
            <Icon type={config.icon}></Icon>
            <SizedBox width={5}></SizedBox>
          </>
        )}
        <StyledInputBase
          ref={ref}
          className={useStyles().input}
          placeholder={props.children}
          type={config.inputType}
        />
      </StyledInput>
      {props.error && (
        <>
          <SizedBox height={8}></SizedBox>
          <ErrorText>{props.error}</ErrorText>
          <SizedBox height={8}></SizedBox>
        </>
      )}
    </>
  );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
