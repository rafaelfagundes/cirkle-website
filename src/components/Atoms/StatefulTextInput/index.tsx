import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cleave from "cleave.js/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import SizedBox from "../SizedBox";

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

const StyledInputBase = styled(Cleave)`
  outline: none;
  border: none;
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
    flex: 1,
    width: "100%",
  },
}));

type StatefulTextInputProps = {
  id?: string;
  name?: string;
  children?: string;
  error?: string;
  type?: string;
  inputType?: string;
  initialValue?: string;
  showIcon?: boolean;
  width?: number;
  helperText?: string;
  disabled?: boolean;
  onEnterKeyPressed?: () => void;
  value: string;
  onChange: Dispatch<SetStateAction<string>> | ((value: string) => void);
  maxLength?: number;
  minLength?: number;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  uppercase?: boolean;
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
    if (value !== "" && value !== undefined && value !== null) {
      return false;
    } else return true;
  };

  useEffect(() => {
    if (!isEmptyField(props.value)) {
      if (!showLabel) setShowLabel(true);
    } else if (isEmptyField(props.value)) {
      setShowLabel(false);
    }
  }, [props.value]);

  const _getOptions = (type: string) => {
    switch (type) {
      case "cardNumber":
        return { creditCard: true };
      case "cardValidUntil":
        return { date: true, datePattern: ["m", "y"] };
      case "cardCvc":
        return { blocks: [4] };
      case "cpf":
        return {
          delimiters: [".", ".", "-"],
          blocks: [3, 3, 3, 2],
          uppercase: true,
        };
      case "cnpj":
        return {
          delimiters: [".", ".", "/", "-"],
          blocks: [2, 3, 3, 4, 2],
          uppercase: true,
        };
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
        {props.inputType && (
          <StyledInputBase
            options={_getOptions(props.inputType)}
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            id={props.id}
            onKeyPress={handleOnKeyPress}
            disabled={props.disabled}
            onChange={
              props.uppercase
                ? (e) => props.onChange(e.target.value.toUpperCase())
                : (e) => props.onChange(e.target.value)
            }
            value={props.value || props.initialValue}
            maxLength={props.maxLength}
            minLength={props.minLength}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            name={props.name}
          />
        )}
        {!props.inputType && (
          <InputBase
            className={useStyles().input}
            placeholder={props.children}
            type={config.inputType}
            id={props.id}
            onKeyPress={handleOnKeyPress}
            disabled={props.disabled}
            onChange={
              props.uppercase
                ? (e) => props.onChange(e.target.value.toUpperCase())
                : (e) => props.onChange(e.target.value)
            }
            value={props.value || props.initialValue}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            name={props.name}
          />
        )}

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
