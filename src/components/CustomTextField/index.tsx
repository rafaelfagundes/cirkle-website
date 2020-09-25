import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import Icon from "../Icon";
import SizedBox from "../SizedBox";

function PhoneMask(props) {
  return (
    <MaskedInput
      {...props}
      ref={(ref) => {
        props.inputRef(ref ? ref.inputElement : null);
      }}
      guide={false}
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
      keepCharPositions={true}
    />
  );
}

function PostalCodeMask(props) {
  return (
    <MaskedInput
      {...props}
      ref={(ref) => {
        props.inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      guide={false}
      keepCharPositions={true}
    />
  );
}

const StyledInput = styled.div<{
  error: boolean;
  showLabel: boolean;
  width?: number;
}>`
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
  padding: ${(props) => (props.showLabel ? "14px 10px 6px 10px" : "0 10px")};
  position: relative;
  transition: 250ms padding;
  max-width: ${(props) => (props.width ? props.width + "px" : "100%")};
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

const IconHolder = styled.div<{ showLabel: boolean }>`
  margin-top: ${(props) => (props.showLabel ? "-8px" : 0)};
  transition: 250ms margin;
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
  id?: string;
  children?: string;
  error?: string;
  type?: string;
  initialValue?: string;
  showIcon?: boolean;
  width?: number;
  onEnterKeyPressed?: () => void;
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
    case "coupon":
      return { icon: "coupon", inputType: "text" };

    default:
      return { icon: null, inputType: "text" };
  }
}

const CustomTextField = React.forwardRef((props: CustomTextFieldProps, ref) => {
  const config = getConfig(props.type);
  const [showLabel, setShowLabel] = useState(false);

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (props.onEnterKeyPressed && event.key === "Enter") {
      props.onEnterKeyPressed();
    }
  };

  const isEmptyField = (value) => {
    switch (value) {
      case "":
        return true;
      case "     -   ":
        return true;
      case "(  )      -    ":
        return true;

      default:
        return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref) {
        if (!isEmptyField(ref["current"].children[0].value)) {
          if (!showLabel) setShowLabel(true);
        } else if (isEmptyField(ref["current"].children[0].value)) {
          setShowLabel(false);
        }
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const _getInput = (type) => {
    switch (type) {
      case "phone":
        return (
          <StyledInputBase
            ref={ref}
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
            inputComponent={PhoneMask}
            id={props.id}
            onKeyPress={handleOnKeyPress}
          />
        );

      case "postalCode":
        return (
          <StyledInputBase
            ref={ref}
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
            inputComponent={PostalCodeMask}
            id={props.id}
            onKeyPress={handleOnKeyPress}
          />
        );

      default:
        return (
          <StyledInputBase
            ref={ref}
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
            id={props.id}
            onKeyPress={handleOnKeyPress}
          />
        );
    }
  };

  return (
    <>
      <StyledInput
        error={
          props.error !== undefined &&
          props.error !== null &&
          props.error !== ""
        }
        showLabel={showLabel}
        width={props.width}
      >
        <PlaceHolder show={showLabel}>
          <PlaceHolderText>{props.children}</PlaceHolderText>
        </PlaceHolder>
        {_getInput(props.type)}

        {config.icon && props.showIcon && (
          <IconHolder showLabel={showLabel}>
            <SizedBox width={5}></SizedBox>
            <Icon type={config.icon} size={28}></Icon>
          </IconHolder>
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
