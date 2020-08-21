import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";

const StyledSocialLoginButton = styled.div`
  cursor: pointer;
  border: 2px solid #cacaca;
  box-sizing: border-box;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SocialLoginButtonText = styled.span`
  margin-left: 5px;
  font-family: FuturaPT;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: ${Colors.PRIMARY};
  text-align: center;
  text-transform: uppercase;
`;

function SocialLoginButton({ children }: { children: string }): JSX.Element {
  const type: string = children.toLowerCase();

  return (
    <StyledSocialLoginButton>
      <Icon type={type} size={16}></Icon>
      <SocialLoginButtonText>{children}</SocialLoginButtonText>
    </StyledSocialLoginButton>
  );
}

export default SocialLoginButton;
