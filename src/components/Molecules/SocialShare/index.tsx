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
import { logEventWithParams } from "../../../utils/logs";

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
  uid,
}: {
  url: string;
  buttonSize?: number;
  marginSize?: number;
  uid: string;
}): JSX.Element {
  const logShare = (socialNetwork: string) => {
    logEventWithParams("share", {
      method: socialNetwork,
      content_type: "Product",
      content_id: uid,
    });
  };

  return (
    <StyledSocialShare buttonSize={buttonSize} marginSize={marginSize}>
      <span onClick={() => logShare("Facebook")}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={buttonSize} />
        </FacebookShareButton>
      </span>
      <span onClick={() => logShare("Twitter")}>
        <TwitterShareButton url={url}>
          <TwitterIcon size={buttonSize} />
        </TwitterShareButton>
      </span>
      <span onClick={() => logShare("WhatsApp")}>
        <WhatsappShareButton url={url} separator=":: ">
          <WhatsappIcon size={buttonSize} />
        </WhatsappShareButton>
      </span>
    </StyledSocialShare>
  );
}

export default SocialShare;
