import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";

const ButtonBase = styled.div`
  min-width: 120px;
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
  font-family: FuturaPT;
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
}: {
  children: string;
  type: string;
  variant: string;
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
          background: Colors.DARK_SEA_GREEN,
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
        <ButtonOutlined color={colors.background}>
          <ButtonText color={colors.background}>{children}</ButtonText>
        </ButtonOutlined>
      );
    case "contained":
      return (
        <ButtonContained color={colors.background}>
          <ButtonText color={colors.text}>{children}</ButtonText>
        </ButtonContained>
      );
    case "text":
      return (
        <ButtonTypeText>
          <ButtonText color={colors.background}>{children}</ButtonText>
        </ButtonTypeText>
      );

    default:
      return (
        <ButtonOutlined color={colors.background}>
          <ButtonText color={colors.text}>{children}</ButtonText>
        </ButtonOutlined>
      );
  }
}

CustomButton.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary", "success", "delete"]),
  variant: PropTypes.oneOf(["outlined", "contained", "text"]),
  children: PropTypes.string,
};

export default CustomButton;
