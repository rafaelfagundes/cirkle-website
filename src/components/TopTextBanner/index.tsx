import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 32px;
  background-color: ${(props) => props.color};
`;

const BannerText = styled.p`
  color: ${(props) => props.color};
  font-family: FuturaPT;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
`;

function TopTextBanner({
  color,
  textColor,
  children,
}: {
  color: string;
  textColor: string;
  children: string;
}): JSX.Element {
  return (
    <StyledBanner color={color}>
      <BannerText color={textColor}>
        {String(children).toUpperCase()}
      </BannerText>
    </StyledBanner>
  );
}

TopTextBanner.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.string,
};

export default TopTextBanner;
