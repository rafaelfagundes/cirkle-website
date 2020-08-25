import { Container, Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import PaymentType from "../PaymentType";
import SizedBox from "../SizedBox";

const FooterLinks = styled.div`
  background-color: ${Colors.MAGENTA};
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
`;

const HeaderSection = styled.span`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.WHITE};
  text-transform: uppercase;
  height: 32px;
`;

const FooterLink = styled.span`
  text-align: center;
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${Colors.WHITE};
  height: 32px;
  cursor: pointer;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px 0;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const Badge = styled.img<{ size: number }>`
  height: ${(props) => props.size}px;
`;

function MobileFooter(): JSX.Element {
  return (
    <FooterLinks>
      <Container maxWidth="xs">
        <Columns>
          <HeaderSection>Cirkle</HeaderSection>
          <MainSection>
            <LinksSection>
              <FooterLink>Como Funciona</FooterLink>
              <FooterLink>Quero Vender</FooterLink>
              <FooterLink>Quero Comprar</FooterLink>
            </LinksSection>
            <LinksSection>
              <FooterLink>Contato</FooterLink>
              <FooterLink>Devolução</FooterLink>
              <FooterLink>Termos de Uso</FooterLink>
            </LinksSection>
          </MainSection>
          <SizedBox height={32}></SizedBox>
          <LinksSection>
            <HeaderSection>Formas de Pagamento</HeaderSection>
            <Grid container spacing={3}>
              <Grid item xs={3} sm={3}>
                <PaymentType type="mastercard" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="visa" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="amex" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="aura" size={48}></PaymentType>
              </Grid>
            </Grid>
            <SizedBox height={16}></SizedBox>
            <Grid container spacing={3}>
              <Grid item xs={3} sm={3}>
                <PaymentType type="dinersclub" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="discover" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="elo" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="hipercard" size={48}></PaymentType>
              </Grid>
            </Grid>
            <SizedBox height={16}></SizedBox>
            <Grid container spacing={3}>
              <Grid item xs={3} sm={3}>
                <PaymentType type="jcb" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="boleto" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="bank_transfer" size={48}></PaymentType>
              </Grid>
            </Grid>
          </LinksSection>
        </Columns>
      </Container>
      <SizedBox height={16}></SizedBox>
      <Row>
        <Badge size={40} src="/images/security_badge.svg"></Badge>
        <SizedBox width={24}></SizedBox>
        <Badge size={40} src="/images/nature_badge.svg"></Badge>
      </Row>
    </FooterLinks>
  );
}

export default MobileFooter;