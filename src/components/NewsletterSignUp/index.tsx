import { Container, InputBase, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Newsletter = styled.div`
  background-color: ${Colors.TYRIAN_PURPLE};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 10px 0;
`;

const NewsletterDescription = styled.p`
  font-family: FuturaPT;
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
  background-color: ${Colors.WHITE};
  height: 45px;
  padding: 8px 12px;
`;

const NLButton = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.PLUM};
  padding: 0 16px;
  cursor: pointer;
`;

const NLButtonText = styled.span`
  color: ${Colors.WHITE};
  font-family: "FuturaPT";
  font-size: 16px;
`;

function NewsletterSignUp(): JSX.Element {
  const theme = useTheme();
  const showButton = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Newsletter>
      <Container maxWidth="xs">
        <Row>
          <NewsletterInput>
            <Icon type="email"></Icon>
            <StyledInputBase
              placeholder="Informe seu email"
              inputProps={{ "aria-label": "search" }}
            />
          </NewsletterInput>
          {showButton && (
            <NLButton>
              <NLButtonText>Enviar</NLButtonText>
            </NLButton>
          )}
        </Row>
        <NewsletterDescription>
          Receba todas as nossas novidades e promoções
        </NewsletterDescription>
      </Container>
    </Newsletter>
  );
}

export default NewsletterSignUp;
