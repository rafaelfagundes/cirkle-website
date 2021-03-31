import { Container, Grid, Hidden, InputBase } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Colors from "../../../enums/Colors";
import Menu from "../../../modules/menu/Menu";
import Icon from "../../Atoms/Icon";
import PaymentType from "../../Atoms/PaymentType";
import SizedBox from "../../Atoms/SizedBox";
import TextLink from "../../Atoms/TextLink";

const Footer = styled.div`
  padding-top: 16px;
  background-color: ${Colors.SECONDARY};
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const HeaderSection = styled.span`
  text-align: center;
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
  height: 36px;
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

const SocialDataInfo = styled.span`
  font-family: "Commissioner";
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: ${Colors.WHITE};
`;

const NewsletterDescription = styled.p`
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  color: ${Colors.WHITE};
  font-size: 14px;
  text-align: center;
  margin: 0;
  font-weight: 500;
`;

const StyledInputBase = styled(InputBase)`
  margin-left: 5px;
  font-family: Commissioner, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 14px;
  margin-top: 3px;
`;

const Newsletter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const NewsletterInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE};
  height: 45px;
  padding: 8px 12px;
  width: 100%;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const NLButton = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.PRIMARY};
  padding: 0 16px;
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const NLButtonText = styled.span`
  color: ${Colors.WHITE};
  font-family: "Commissioner";
  font-size: 14px;
  font-weight: 500;
`;

function DesktopFooter({ menu }: { menu: Menu }): JSX.Element {
  const links = [];

  const getMenu = (menu: Menu) => {
    if (!menu) return;
    Object.keys(menu).forEach((department) => {
      links.push(<HeaderSection>{menu[department].title}</HeaderSection>);

      let count = 0;
      Object.keys(menu[department].categories).forEach((cat) => {
        if (count > 3) return;
        links.push(
          <FooterLink>
            <TextLink
              href={`/pesquisa/?${menu[department].categories[cat].link}`}
              color={Colors.WHITE}
              size={14}
            >
              {menu[department].categories[cat].title}
            </TextLink>
          </FooterLink>
        );
        count++;
      });
    });

    return links;
  };

  return (
    <Footer>
      <Container maxWidth="md" disableGutters>
        <Columns>
          <LinksSection>
            <HeaderSection>Saiba mais</HeaderSection>
            <FooterLink>
              <TextLink href="/como-funciona" color={Colors.WHITE} size={14}>
                Como Funciona
              </TextLink>
            </FooterLink>
            <FooterLink>
              <TextLink href="/quero-vender" color={Colors.WHITE} size={14}>
                Quero Vender
              </TextLink>
            </FooterLink>
            <FooterLink>
              <TextLink href="/quero-comprar" color={Colors.WHITE} size={14}>
                Quero Comprar
              </TextLink>
            </FooterLink>
            <FooterLink>
              <TextLink href="/contato" color={Colors.WHITE} size={14}>
                Contato
              </TextLink>
            </FooterLink>
            <FooterLink>
              <TextLink href="/devolucao" color={Colors.WHITE} size={14}>
                Devolução
              </TextLink>
            </FooterLink>
            <FooterLink>
              <TextLink href="/termos-de-uso" color={Colors.WHITE} size={14}>
                Termos de Uso
              </TextLink>
            </FooterLink>
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
                  <SocialDataInfo>(32) 99123-4567</SocialDataInfo>
                </SocialData>
              </Social>
            </SocialFooter>
          </LinksSection>
          <Hidden only="xs">
            <LinksSection>{getMenu(menu)}</LinksSection>
          </Hidden>
          <LinksSection>
            <HeaderSection>Newsletter</HeaderSection>
            <Newsletter>
              <NewsletterInput>
                <Icon type="email"></Icon>
                <StyledInputBase
                  id="newsletter-input-desktop"
                  placeholder="Informe seu email"
                  inputProps={{ "aria-label": "search" }}
                />
              </NewsletterInput>
              <NLButton>
                <NLButtonText>Enviar</NLButtonText>
              </NLButton>
            </Newsletter>
            <NewsletterDescription>
              Receba nossas novidades e promoções
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
                <PaymentType type="dinersclub" size={48}></PaymentType>
              </Grid>
            </Grid>
            <SizedBox height={16}></SizedBox>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <PaymentType type="elo" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="hipercard" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="boleto" size={48}></PaymentType>
              </Grid>
              <Grid item md={3}>
                <PaymentType type="loterica" size={48}></PaymentType>
              </Grid>
            </Grid>
            <SizedBox height={16}></SizedBox>
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
