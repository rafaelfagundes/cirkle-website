import { Container, Hidden } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import NewsletterSignUp from "../NewsletterSignUp";

const Legal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${Colors.TYRIAN_PURPLE};
`;

const LegalText = styled.span`
  text-align: center;
  font-family: FuturaPT;
  font-weight: 600;
  font-size: 10px;
  color: ${Colors.WHITE};
`;

const FooterLinks = styled.div`
  background-color: ${Colors.MAGENTA};
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* flex: 1; */
`;

const HeaderSection = styled.span`
  text-align: center;
  font-family: FuturaPT;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.WHITE};
  text-transform: uppercase;
  height: 32px;
`;

const FooterLink = styled.span`
  text-align: center;
  font-family: FuturaPT;
  font-weight: 400;
  font-size: 14px;
  color: ${Colors.WHITE};
  height: 32px;
  cursor: pointer;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 24px 0;
`;

function Footer(): JSX.Element {
  return (
    <div>
      <NewsletterSignUp></NewsletterSignUp>
      <FooterLinks>
        <Container maxWidth="md">
          <Columns>
            <LinksSection>
              <HeaderSection>Cirkle</HeaderSection>
              <FooterLink>Como Funciona</FooterLink>
              <FooterLink>Quero Vender</FooterLink>
              <FooterLink>Quero Comprar</FooterLink>
              <FooterLink>Contato</FooterLink>
              <FooterLink>Devolução</FooterLink>
              <FooterLink>Termos de Uso</FooterLink>
            </LinksSection>
            <Hidden only="xs">
              <LinksSection>
                <HeaderSection>Categorias</HeaderSection>
                <FooterLink>Roupas</FooterLink>
                <FooterLink>Bolsas</FooterLink>
                <FooterLink>Calçados</FooterLink>
                <FooterLink>Acessórios</FooterLink>
              </LinksSection>
            </Hidden>
            <LinksSection>
              <HeaderSection>Pagamento</HeaderSection>
              <FooterLink>Cartão de Crédito</FooterLink>
              <FooterLink>Cartão de Débito</FooterLink>
              <FooterLink>Transferência</FooterLink>
              <FooterLink>Ao Receber*</FooterLink>
            </LinksSection>
          </Columns>
        </Container>
      </FooterLinks>
      <Legal>
        <LegalText>CIRKLE TECNOLOGIA E COMERCIO LTDA - MG</LegalText>
        <LegalText>
          ©2020 TODOS OS DIREITOS RESERVADOS - CNPJ: 11.222.333/0001-99
        </LegalText>
      </Legal>
    </div>
  );
}

export default Footer;
