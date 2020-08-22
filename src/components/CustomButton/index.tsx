import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import LoadingAnimation from "../LoadingAnimation";

const ButtonBase = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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
  padding: 8px 16px;
  box-sizing: border-box;
  border: 2px solid ${(props) => props.color};
`;

const ButtonText = styled.span<{ color?: string }>`
  position: relative;
  color: ${(props) => props.color};
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  user-select: none;
`;

const ButtonOutlined = styled(ButtonBase)<{ color?: string }>`
  position: relative;
  padding: 8px 16px;
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
}: {
  children: string;
  type: string;
  variant: string;
  width?: number;
  loading?: boolean;
  onClick: () => void;
}): JSX.Element {
  function getColors(type: string): { background: string; text: string } {
    switch (type) {
      case "primary":
        return {
          background: Colors.PRIMARY,
          text: Colors.WHITE,
        };
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

  const colors = getColors(type);

  switch (variant) {
    case "outlined":
      return (
        <ButtonOutlined
          width={width}
          color={colors.background}
          onClick={onClick}
        >
          {!loading && (
            <ButtonText color={colors.background}>{children}</ButtonText>
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
        >
          {!loading && <ButtonText color={colors.text}>{children}</ButtonText>}
          {loading && <LoadingAnimation size={20}></LoadingAnimation>}
        </ButtonContained>
      );
    case "text":
      return (
        <ButtonTypeText width={width} onClick={onClick}>
          {!loading && (
            <ButtonText color={colors.background}>{children}</ButtonText>
          )}
          {loading && <LoadingAnimation size={20} color></LoadingAnimation>}
        </ButtonTypeText>
      );

    default:
      return (
        <ButtonOutlined
          width={width}
          color={colors.background}
          onClick={onClick}
        >
          {!loading && <ButtonText color={colors.text}>{children}</ButtonText>}
          {loading && <CircularProgress size={20} color="secondary" />}
        </ButtonOutlined>
      );
  }
}

export default CustomButton;
