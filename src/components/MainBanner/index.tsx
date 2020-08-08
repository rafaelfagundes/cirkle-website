import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledBanner = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

function MainBanner({ url }: { url: string }): JSX.Element {
  return (
    <StyledBanner>
      <Image src={url} />
    </StyledBanner>
  );
}

MainBanner.propTypes = {
  url: PropTypes.string,
};

export default MainBanner;
