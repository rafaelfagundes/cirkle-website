import { Container, InputBase } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";

const Newsletter = styled.div`
  background-color: ${Colors.RED_PINK};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 10px 0;
`;

const NewsletterDescription = styled.p`
  font-family: "FuturaPT";
  color: ${Colors.WHITE};
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 5px;
  font-family: FuturaPT;
  font-size: 16px;
  margin-top: 3px;
`;

const NewsletterInput = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  height: 45px;
  padding: 8px 12px;
  margin-bottom: 10px;
`;

function NewsletterSignUp(props): JSX.Element {
  return (
    <Newsletter>
      <Container maxWidth="xs">
        <NewsletterInput>
          <Icon type="email"></Icon>
          <StyledInputBase
            placeholder="Informe seu email"
            inputProps={{ "aria-label": "search" }}
          />
        </NewsletterInput>
        <NewsletterDescription>
          Receba todas as nossas novidades e promoções
        </NewsletterDescription>
      </Container>
    </Newsletter>
  );
}

export default NewsletterSignUp;
