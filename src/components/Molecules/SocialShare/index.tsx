import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import styled from "styled-components";

const StyledSocialShare = styled.div<{
  buttonSize: number;
  marginSize: number;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${(props) => props.buttonSize * 3 + props.marginSize * 2}px;
  justify-content: space-between;
`;

function SocialShare({
  url,
  buttonSize = 36,
  marginSize = 16,
}: {
  url: string;
  buttonSize?: number;
  marginSize?: number;
}): JSX.Element {
  return (
    <StyledSocialShare buttonSize={buttonSize} marginSize={marginSize}>
      <FacebookShareButton url={url}>
        <FacebookIcon size={buttonSize} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={buttonSize} />
      </TwitterShareButton>
      <WhatsappShareButton url={url} separator=":: ">
        <WhatsappIcon size={buttonSize} />
      </WhatsappShareButton>
    </StyledSocialShare>
  );
}

export default SocialShare;
