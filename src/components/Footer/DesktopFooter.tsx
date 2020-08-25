import { Container, Grid, Hidden, InputBase } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../theme/theme";
import Icon from "../Icon";
import PaymentType from "../PaymentType";
import SizedBox from "../SizedBox";

const Footer = styled.div`
  padding-top: 16px;
  background-color: ${Colors.MAGENTA};
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const HeaderSection = styled.span`
  text-align: center;
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
  height: 36px;
  cursor: pointer;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
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

const SocialFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  border-radius: 8px;
`;

const SocialData = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
`;

const SocialDataTitle = styled.span`
  font-family: "FuturaPT";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: ${Colors.MIDDLE_YELLOW};
`;

const SocialDataInfo = styled.span`
  font-family: "FuturaPT";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.WHITE};
`;

const NewsletterDescription = styled.p`
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  color: ${Colors.WHITE};
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

const StyledInputBase = styled(InputBase)`
  width: 100%;
  margin-left: 5px;
  font-family: FuturaPT, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  margin-top: 3px;
`;

const Newsletter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
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

function DesktopFooter(): JSX.Element {
  return (
    <Footer>
      <Container maxWidth="md" disableGutters>
        <Columns>
          <LinksSection>
            <HeaderSection>Cirkle</HeaderSection>
            <FooterLink>Como Funciona</FooterLink>
            <FooterLink>Quero Vender</FooterLink>
            <FooterLink>Quero Comprar</FooterLink>
            <FooterLink>Contato</FooterLink>
            <FooterLink>Devolução</FooterLink>
            <FooterLink>Termos de Uso</FooterLink>
            <SizedBox height={16}></SizedBox>
            <HeaderSection>Manda um oi pra gente</HeaderSection>
            <SocialFooter>
              <Social>
                <Icon size={36} type="facebook-white"></Icon>
              </Social>
              <Social>
                <Icon size={36} type="instagram-white"></Icon>
              </Social>
              <Social>
                <Icon size={36} type="whatsapp-white"></Icon>
                <SocialData>
                  <SocialDataTitle>adicione no zap</SocialDataTitle>
                  <SocialDataInfo>(32) 99123-4567</SocialDataInfo>
                </SocialData>
              </Social>
            </SocialFooter>
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
            <HeaderSection>Newsletter</HeaderSection>
            <Newsletter>
              <NewsletterInput>
                <Icon type="email"></Icon>
                <StyledInputBase
                  placeholder="Informe seu email"
                  inputProps={{ "aria-label": "search" }}
                />
              </NewsletterInput>
              <NLButton>
                <NLButtonText>Enviar</NLButtonText>
              </NLButton>
            </Newsletter>
            <NewsletterDescription>
              Receba todas as nossas novidades e promoções
            </NewsletterDescription>
            <SizedBox height={24}></SizedBox>
            <HeaderSection>Formas de Pagamento</HeaderSection>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <PaymentType type="mastercard" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="visa" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="amex" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="aura" size={48}></PaymentType>
              </Grid>
            </Grid>
            <SizedBox height={16}></SizedBox>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <PaymentType type="dinersclub" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="discover" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="elo" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="hipercard" size={48}></PaymentType>
              </Grid>
            </Grid>
            <SizedBox height={16}></SizedBox>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <PaymentType type="jcb" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="boleto" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="bank_transfer" size={48}></PaymentType>
              </Grid>
            </Grid>
          </LinksSection>
        </Columns>
      </Container>
      <SizedBox height={32}></SizedBox>
      <Row>
        <Badge size={48} src="/images/security_badge.svg"></Badge>
        <SizedBox width={36}></SizedBox>
        <Badge size={48} src="/images/nature_badge.svg"></Badge>
      </Row>
    </Footer>
  );
}

export default DesktopFooter;
