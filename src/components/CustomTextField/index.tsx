import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Icon from "../Icon";
import SizedBox from "../SizedBox";

const StyledInput = styled.div<{ error: boolean }>`
  border: ${(props) => {
    if (props.error) {
      return `3px solid ${Colors.ERROR}`;
    } else {
      return `2px solid ${Colors.PRIMARY}`;
    }
  }};
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
`;

const ErrorText = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  color: ${Colors.ERROR};
`;

const useStyles = makeStyles(() => ({
  input: {
    fontFamily: "FuturaPT",
    fontSize: 18,
  },
}));

type CustomTextFieldProps = {
  children?: string;
  error?: string;
  type?: string;
  initialValue?: string;
  showIcon?: boolean;
};

function getConfig(type: string): { icon: string; inputType: string } {
  switch (type) {
    case "password":
      return { icon: "key", inputType: "password" };
    case "email":
      return { icon: "email", inputType: "email" };
    case "user":
      return { icon: "person", inputType: "text" };
    case "phone":
      return { icon: "phone", inputType: "text" };

    default:
      return { icon: null, inputType: "text" };
  }
}

const CustomTextField = React.forwardRef((props: CustomTextFieldProps, ref) => {
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
        {config.icon && props.showIcon && (
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
          defaultValue={props.initialValue}
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
