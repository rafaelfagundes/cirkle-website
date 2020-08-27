import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";
import LoadingAnimation from "../LoadingAnimation";
import SizedBox from "../SizedBox";

const ButtonBase = styled.div<{ width: number; small: boolean }>`
  width: ${(props) => props.width}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: ${(props) => (props.small ? "28px" : "44px")};

  &:hover {
    filter: saturate(200%);
  }
  &:active {
    filter: contrast(150%);
  }
`;

const ButtonContained = styled(ButtonBase)<{ color?: string }>`
  position: relative;
  background-color: ${(props) => props.color};
  padding: 0px 8px;
  box-sizing: border-box;
  border: 2px solid ${(props) => props.color};
`;

const TextIconHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.span<{ color?: string; small: boolean }>`
  position: relative;
  color: ${(props) => props.color};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: ${(props) => (props.small ? "12px" : "14px")};
  user-select: none;

  border: none;
  cursor: pointer;
  letter-spacing: 0.0857142857em;
  line-height: 1em;
  margin: 0 auto;
  text-align: center;
  text-decoration: none;
`;

const ButtonOutlined = styled(ButtonBase)<{ color?: string }>`
  position: relative;
  padding: 0px 8px;
  border: 2px solid ${(props) => props.color};
  box-sizing: border-box;
`;

const ButtonTypeText = styled(ButtonBase)`
  padding: 8px 16px;
  box-sizing: border-box;
`;

function CustomButton({
  children,
  type,
  variant,
  width = 120,
  loading = false,
  onClick,
  small = false,
  icon,
}: {
  children: string;
  type: string;
  variant: string;
  width?: number;
  loading?: boolean;
  small?: boolean;
  icon?: string;
  onClick: () => void;
}): JSX.Element {
  function getColors(): { background: string; text: string } {
    switch (type) {
      case "secondary":
        return {
          background: Colors.GRAY,
          text: Colors.WHITE,
        };
      case "success":
        return {
          background: Colors.FOREST_GREEN_CRAYOLA,
          text: Colors.WHITE,
        };
      case "delete":
        return {
          background: Colors.RED_CRAYOLA,
          text: Colors.WHITE,
        };
      default:
        return {
          background: Colors.PRIMARY,
          text: Colors.WHITE,
        };
    }
  }

  const colors = getColors();

  switch (variant) {
    case "outlined":
      return (
        <ButtonOutlined
          width={width}
          color={colors.background}
          onClick={onClick}
          small={small}
        >
          {!loading && (
            <TextIconHolder>
              {icon && (
                <>
                  <Icon type={icon}></Icon>
                  <SizedBox width={5}></SizedBox>
                </>
              )}
              <ButtonText small={small} color={colors.background}>
                {children}
              </ButtonText>
            </TextIconHolder>
          )}
          {loading && <LoadingAnimation size={20} color></LoadingAnimation>}
        </ButtonOutlined>
      );
    case "contained":
      return (
        <ButtonContained
          width={width}
          color={colors.background}
          onClick={onClick}
          small={small}
        >
          {!loading && (
            <TextIconHolder>
              {icon && (
                <>
                  <Icon type={icon}></Icon>
                  <SizedBox width={5}></SizedBox>
                </>
              )}
              <ButtonText small={small} color={colors.text}>
                {children}
              </ButtonText>
            </TextIconHolder>
          )}
          {loading && <LoadingAnimation size={20}></LoadingAnimation>}
        </ButtonContained>
      );
    case "text":
      return (
        <ButtonTypeText width={width} onClick={onClick} small={small}>
          {!loading && (
            <TextIconHolder>
              {icon && (
                <>
                  <Icon type={icon}></Icon>
                  <SizedBox width={5}></SizedBox>
                </>
              )}
              <ButtonText small={small} color={colors.background}>
                {children}
              </ButtonText>
            </TextIconHolder>
          )}
          {loading && <LoadingAnimation size={20} color></LoadingAnimation>}
        </ButtonTypeText>
      );
    case "primary":
    default:
      return (
        <ButtonOutlined
          width={width}
          color={colors.background}
          onClick={onClick}
          small={small}
        >
          {!loading && (
            <TextIconHolder>
              {icon && (
                <>
                  <Icon type={icon}></Icon>
                  <SizedBox width={5}></SizedBox>
                </>
              )}
              <ButtonText small={small} color={colors.text}>
                {children}
              </ButtonText>
            </TextIconHolder>
          )}
          {loading && <CircularProgress size={20} color="secondary" />}
        </ButtonOutlined>
      );
  }
}

export default CustomButton;
