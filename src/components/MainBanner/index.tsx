import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import Colors from "../../enums/Colors";
import { cloudinaryImage } from "../../utils/image";
import SizedBox from "../SizedBox/index";

const StyledBanner = styled.div<{ bgImage: string; height: number }>`
  background-image: ${(props) => `url("${props.bgImage}");`};
  background-color: #cccccc;
  height: ${(props) => props.height}px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

const InnerContent = styled.div`
  padding: 16px;
`;

const Column = styled.div<{
  height: number;
  alignItems: string;
  justifyContent: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  height: ${(props) => props.height - 32}px;
`;

const TextLine = styled.div<{ size: number; bgColor: string }>`
  height: ${(props) => props.size * 2}px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
`;

const Text = styled.span<{ size: number; textColor: string }>`
  font-family: "Commissioner";
  text-transform: uppercase;
  font-weight: 700;
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.textColor};
  padding: 0 ${(props) => props.size}px;
`;

function MainBanner({
  url,
  position = "left",
  primaryText,
  secondaryText,
  primaryTextColor = Colors.WHITE,
  primaryBackgroundColor = Colors.PRIMARY,
  secondaryTextColor = Colors.WHITE,
  secondaryBackgroundColor = Colors.SECONDARY,
}: {
  url: string;
  position?: string;
  primaryText: string;
  secondaryText?: string;
  primaryTextColor?: string;
  primaryBackgroundColor?: string;
  secondaryTextColor?: string;
  secondaryBackgroundColor?: string;
}): JSX.Element {
  const fontSize = window.innerHeight * 0.03;
  const bannerSize = window.innerHeight * 0.4;

  function getPositions(): {
    justifyContent: string;
    alignItems: string;
  } {
    switch (position) {
      case "center":
        return { alignItems: "center", justifyContent: "center" };
      case "top":
        return { alignItems: "center", justifyContent: "flex-start" };
      case "top-right":
        return { alignItems: "flex-end", justifyContent: "flex-start" };
      case "right":
        return { alignItems: "flex-end", justifyContent: "center" };
      case "bottom-right":
        return { alignItems: "flex-end", justifyContent: "flex-end" };
      case "bottom":
        return { alignItems: "center", justifyContent: "flex-end" };
      case "bottom-left":
        return { alignItems: "flex-start", justifyContent: "flex-end" };
      case "left":
        return { alignItems: "flex-start", justifyContent: "center" };
      case "top-left":
        return { alignItems: "flex-start", justifyContent: "flex-start" };
      default:
        return { alignItems: "flex-start", justifyContent: "center" };
    }
  }

  const positions = getPositions();

  const bannerImageSize = window.innerWidth > 960 ? 960 : window.innerWidth;

  return (
    <StyledBanner
      bgImage={cloudinaryImage(url, bannerImageSize)}
      height={bannerSize}
    >
      <InnerContent>
        <Column
          height={bannerSize}
          justifyContent={positions.justifyContent}
          alignItems={positions.alignItems}
        >
          <TextLine size={fontSize} bgColor={primaryBackgroundColor}>
            <Text textColor={primaryTextColor} size={fontSize}>
              {primaryText}
            </Text>
          </TextLine>
          {secondaryText && (
            <>
              <SizedBox height={10}></SizedBox>
              <TextLine size={fontSize} bgColor={secondaryBackgroundColor}>
                <Text textColor={secondaryTextColor} size={fontSize}>
                  {secondaryText}
                </Text>
              </TextLine>
            </>
          )}
        </Column>
      </InnerContent>
    </StyledBanner>
  );
}

MainBanner.propTypes = {
  url: PropTypes.string,
  position: PropTypes.oneOf([
    "center",
    "top",
    "top-right",
    "right",
    "bottom-right",
    "bottom",
    "bottom-left",
    "left",
    "top-left",
  ]),
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  primaryTextColor: PropTypes.oneOf(
    Object.keys(Colors).map((item) => Colors[item])
  ),
  primaryBackgroundColor: PropTypes.oneOf(
    Object.keys(Colors).map((item) => Colors[item])
  ),
  secondaryTextColor: PropTypes.oneOf(
    Object.keys(Colors).map((item) => Colors[item])
  ),
  secondaryBackgroundColor: PropTypes.oneOf(
    Object.keys(Colors).map((item) => Colors[item])
  ),
};

export default MainBanner;
