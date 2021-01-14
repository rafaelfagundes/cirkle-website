import { Container, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import PaymentType from "../../Atoms/PaymentType";
import SizedBox from "../../Atoms/SizedBox";

const FooterLinks = styled.div`
  background-color: ${Colors.SECONDARY};
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
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.WHITE};
  text-transform: uppercase;
  height: 32px;
`;

const FooterLink = styled.span`
  text-align: center;
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: 14px;
  height: 32px;
  cursor: pointer;
  color: ${Colors.WHITE};
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
  const router = useRouter();

  const _goTo = (route: string) => {
    router.push(route);
  };

  return (
    <FooterLinks>
      <Container maxWidth="xs">
        <Columns>
          <HeaderSection>Cirkle</HeaderSection>
          <MainSection>
            <LinksSection>
              <FooterLink onClick={() => _goTo("/como-funciona")}>
                Como Funciona
              </FooterLink>
              <FooterLink onClick={() => _goTo("/quero-vender")}>
                Quero Vender
              </FooterLink>
              <FooterLink onClick={() => _goTo("/quero-comprar")}>
                Quero Comprar
              </FooterLink>
            </LinksSection>
            <LinksSection>
              <FooterLink onClick={() => _goTo("/contato")}>Contato</FooterLink>
              <FooterLink onClick={() => _goTo("/devolucao")}>
                Devolução
              </FooterLink>
              <FooterLink onClick={() => _goTo("/termos-de-uso")}>
                Termos de Uso
              </FooterLink>
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
                <PaymentType type="dinersclub" size={48}></PaymentType>
              </Grid>
            </Grid>
            <SizedBox height={16}></SizedBox>
            <Grid container spacing={3}>
              <Grid item xs={3} sm={3}>
                <PaymentType type="elo" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="hipercard" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="boleto" size={48}></PaymentType>
              </Grid>
              <Grid item xs={3} sm={3}>
                <PaymentType type="loterica" size={48}></PaymentType>
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
