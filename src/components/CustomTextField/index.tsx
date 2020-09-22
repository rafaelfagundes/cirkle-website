import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Icon from "../Icon";
import SizedBox from "../SizedBox";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

const StyledInput = styled.div<{ error: boolean; showLabel: boolean }>`
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
  padding: ${(props) => (props.showLabel ? "13px 10px 7px 10px" : "0 10px")};
  position: relative;
  transition: 250ms padding;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
`;

const PlaceHolder = styled.div<{ show: boolean }>`
  position: absolute;
  background-color: ${Colors.PRIMARY};
  top: -10px;
  left: 6px;
  padding: 0 8px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 500ms opacity;
`;

const PlaceHolderText = styled.span`
  color: ${Colors.WHITE};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 14px;
  font-weight: 400;
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
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref) {
        if (ref["current"].children[0].value !== "") {
          if (!showLabel) setShowLabel(true);
        } else if (ref["current"].children[0].value === "") {
          setShowLabel(false);
        }
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <StyledInput
        error={
          props.error !== undefined &&
          props.error !== null &&
          props.error !== ""
        }
        showLabel={showLabel}
      >
        <PlaceHolder show={showLabel}>
          <PlaceHolderText>{props.children}</PlaceHolderText>
        </PlaceHolder>
        {config.icon && props.showIcon && (
          <>
            <Icon type={config.icon}></Icon>
            <SizedBox width={5}></SizedBox>
          </>
        )}
        {props.type !== "phone" && (
          <StyledInputBase
            ref={ref}
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
          />
        )}
        {props.type === "phone" && (
          <StyledInputBase
            ref={ref}
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
            inputComponent={TextMaskCustom}
          />
        )}
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
