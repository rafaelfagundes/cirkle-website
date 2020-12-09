import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
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
  background-color: ${Colors.WHITE};
  border-radius: 4px;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
`;

const PlaceHolder = styled.div<{ show: boolean; error: boolean }>`
  position: absolute;
  background-color: ${(props) => (props.error ? Colors.ERROR : Colors.PRIMARY)};
  top: -10px;
  left: 6px;
  padding: 0 8px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 500ms opacity;
  border-radius: 4px;
`;

const PlaceHolderText = styled.span`
  color: ${Colors.WHITE};
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const IconHolder = styled.div<{ showLabel: boolean }>`
  margin-top: ${(props) => (props.showLabel ? "-8px" : 0)};
  transition: 250ms margin;
`;

const ErrorText = styled.span`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  color: ${Colors.ERROR};
`;

const useStyles = makeStyles(() => ({
  input: {
    fontFamily: "Commissioner",
    fontSize: 16,
  },
}));

type StatefulTextInputProps = {
  id?: string;
  children?: string;
  error?: string;
  type?: string;
  initialValue?: string;
  showIcon?: boolean;
  width?: number;
  helperText?: string;
  disabled?: boolean;
  onEnterKeyPressed?: () => void;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

function getConfig(type: string): { icon: string; inputType: string } {
  switch (type) {
    case "password":
      return { icon: "key", inputType: "password" };
    case "email":
      return { icon: "email", inputType: "email" };
    case "user":
      return { icon: "user", inputType: "text" };
    case "phone":
      return { icon: "smartphone", inputType: "text" };
    case "coupon":
      return { icon: "tag", inputType: "text" };
    case "date":
      return { icon: "calendar", inputType: "text" };

    default:
      return { icon: null, inputType: "text" };
  }
}

const StatefulTextInput = (props: StatefulTextInputProps): JSX.Element => {
  const config = getConfig(props.type);
  const [showLabel, setShowLabel] = useState(false);

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (props.onEnterKeyPressed && event.key === "Enter") {
      props.onEnterKeyPressed();
    }
  };

  const isEmptyField = (value: string) => {
    if (props.initialValue) return false;
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
    if (!isEmptyField(props.value)) {
      if (!showLabel) setShowLabel(true);
    } else if (isEmptyField(props.value)) {
      setShowLabel(false);
    }
  }, [props.value]);

  const _getInput = (type: string) => {
    switch (type) {
      case "phone":
        return (
          <StyledInputBase
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
            inputComponent={PhoneMask}
            id={props.id}
            onKeyPress={handleOnKeyPress}
            disabled={props.disabled}
            onChange={(e) => props.onChange(e.target.value)}
          />
        );

      case "postalCode":
        return (
          <StyledInputBase
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
            inputComponent={PostalCodeMask}
            id={props.id}
            onKeyPress={handleOnKeyPress}
            disabled={props.disabled}
            onChange={(e) => props.onChange(e.target.value)}
          />
        );

      default:
        return (
          <StyledInputBase
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            defaultValue={props.initialValue}
            id={props.id}
            onKeyPress={handleOnKeyPress}
            disabled={props.disabled}
            onChange={(e) => props.onChange(e.target.value)}
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
        <PlaceHolder
          show={showLabel}
          error={
            props.error !== undefined &&
            props.error !== null &&
            props.error !== ""
          }
        >
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
      {props.helperText && (
        <>
          <SizedBox height={4}></SizedBox>
          <SimpleText size={0.9}>{props.helperText}</SimpleText>
        </>
      )}
      {props.error && (
        <>
          <SizedBox height={8}></SizedBox>
          <ErrorText>{props.error}</ErrorText>
          <SizedBox height={8}></SizedBox>
        </>
      )}
    </>
  );
};

StatefulTextInput.displayName = "CustomTextField";

export default StatefulTextInput;
