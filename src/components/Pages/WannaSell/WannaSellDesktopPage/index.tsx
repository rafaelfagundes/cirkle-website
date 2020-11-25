import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Colors from "../../../../enums/Colors";
import theme from "../../../../theme/theme";
import Center from "../../../Atoms/Center";
import Column from "../../../Atoms/Column";
import Icon from "../../../Atoms/Icon";
import Row from "../../../Atoms/Row";
import SizedBox from "../../../Atoms/SizedBox";
import Title from "../../../Atoms/Title";
import DoDontCard from "../../../Molecules/DoDontCard";
import PageSection from "../../../Molecules/PageSection";
import StepCard from "../../../Molecules/StepCard";
import StepItem from "../../../Molecules/StepItem";
import WannaSellDesktopHero from "../WannaSellDesktopHero";

const PriceTable = styled.table`
  background-color: ${Colors.WHITE};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);

  border-collapse: collapse;
  border-radius: 4px;
  overflow: hidden;
`;

const HeaderTitle = styled.td<{ featured?: boolean }>`
  padding: 10px;
  text-align: center;
  min-width: 200px;
  background-color: ${(props) => (props.featured ? "#408856" : Colors.PRIMARY)};
  color: ${Colors.WHITE};
  font-family: Commissioner, sans-serif;
  font-weight: 700;
  font-size: 16px;
`;

const Cell = styled.td<{ featured?: boolean; odd?: boolean }>`
  padding: 10px;
  text-align: center;
  min-width: 200px;
  background-color: ${(props) =>
    props.featured
      ? props.odd
        ? "#408856"
        : Colors.FOREST_GREEN_CRAYOLA
      : props.odd
      ? Colors.LIGHT_GRAY
      : Colors.WHITE};
  color: ${(props) => (props.featured ? Colors.WHITE : Colors.PRIMARY)};
  font-family: Commissioner, sans-serif;
  font-weight: 500;
  font-size: 16px;
`;

const CTAButton = styled.div`
  width: 575px;
  height: 150px;
  background: linear-gradient(180deg, #f2653c 0%, #ea4110 100%);
  box-shadow: 0px 0px 32px rgba(242, 101, 60, 0.35);
  border-radius: 8px;
  padding: 32px;
  cursor: pointer;
`;

const ButtonPrimaryText = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${Colors.WHITE};
  text-align: center;
`;

const ButtonSecondaryText = styled.div`
  font-family: Commissioner, sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 43px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${Colors.WHITE};
  text-align: center;
`;

function WannaSellDesktop(): JSX.Element {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      borderRadius: "4px",
      overflow: "hidden",
      border: "none",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expanded: {
      "&$expanded": {
        margin: "0px 0",
      },
    },
  });

  const classes = useStyles();

  return (
    <>
      <WannaSellDesktopHero></WannaSellDesktopHero>
      <PageSection
        headline="Como Funciona"
        subheadline="Veja como é simples fazer a moda circular"
      >
        <Row>
          <StepItem title="Escolha Suas Peças" icon="sell-t-shirt">
            Selecione pelo menos 5 itens em perfeito estado
          </StepItem>
          <Icon type="chevron-right" size={16}></Icon>
          <StepItem title="Envie Pra Gente" icon="sell-delivery-truck">
            Verifique os procedimentos certinho e manda pra cá
          </StepItem>
          <Icon type="chevron-right" size={16}></Icon>
          <StepItem title="Faça Uma Grana" icon="sell-money">
            Sua peça que estava parada, se transforma em dinheiro
          </StepItem>
        </Row>
      </PageSection>
      <PageSection
        headline="Que simples! Mas o que posso enviar?"
        subheadline="Confira os itens que nós aceitamos e os que não aceitamos"
        odd={true}
      >
        <Row>
          <DoDontCard
            title="Isso pode empacotar"
            sections={[
              {
                title: "Peças Femininas",
                items: ["Roupas", "Bolsas", "Sapatos", "Acessórios femininos"],
              },
              {
                title: "Peças Infantis",
                items: ["Roupas", "Bolsas", "Sapatos", "Acessórios infantis"],
              },
            ]}
          ></DoDontCard>
          <SizedBox width={20}></SizedBox>
          <DoDontCard
            positive={false}
            title="Oops, isso não aceitamos"
            sections={[
              {
                items: [
                  "Peças masculinas para adultos",
                  "Peças de coleções superior a 5 anos",
                  "Peças teen - 14 a 16 anos",
                  "Produtos com corino ( Couro sintético / Ecológico )",
                  "Pele animal ( Natural )",
                  "Couro vegetal e/ou sintético e vinil",
                  "Itens sem a etiqueta da marca e tamanho",
                  "Itens danificados ou rasgados",
                  "Itens com manchas",
                  "Itens com ajustes e costuras que não são de fábrica",
                  "Falsificações ou réplicas",
                  "Peças íntimas, meias e pijamas",
                  "Peças feitas sob medida",
                  "Biquínis e maiôs usados",
                  "Relógios sem pilha",
                  "Calças e shorts de cintura baixa",
                  "Vestidos e blusas Tomara-que-caia",
                ],
              },
            ]}
          ></DoDontCard>
        </Row>
      </PageSection>
      <PageSection
        headline="E como eu faço para enviar?"
        subheadline="Agora vamos aos procedimentos de envio"
      >
        <Column>
          <StepCard position={1}>
            Selecione pelo menos 5 itens em perfeito estado e reuna algumas
            informações básicas sobre eles, tais como: marca, tamanho, cor e o
            que mais achar importante.
          </StepCard>
          <SizedBox height={20}></SizedBox>
          <StepCard position={2}>
            Preencha seus dados e as informações dos produtos. Verifique se eles
            são aceitos por nós.
          </StepCard>
          <SizedBox height={20}></SizedBox>
          <StepCard position={3}>
            Pronto, agora solicite o código para envio gratuito dos produtos via
            serviço postal, ou agende a retirada em casa (somente São João del
            Rei)
          </StepCard>
        </Column>
      </PageSection>
      <PageSection
        headline="Quanto eu posso receber?"
        subheadline="Confira o valor da comissão e quanto você recebe"
        odd
      >
        <PriceTable>
          <thead>
            <HeaderTitle>Valor da Peça Vendida</HeaderTitle>
            <HeaderTitle featured={true}>Você Recebe</HeaderTitle>
            <HeaderTitle>Nossa Comissão</HeaderTitle>
          </thead>
          <tbody>
            <tr>
              <Cell>Até R$ 250,00</Cell>
              <Cell featured={true}>50%</Cell>
              <Cell>50%</Cell>
            </tr>
            <tr>
              <Cell odd>De R$ 250,01 até R$ 750,00</Cell>
              <Cell featured={true} odd>
                60%
              </Cell>
              <Cell odd>40%</Cell>
            </tr>
            <tr>
              <Cell>De R$ 750,01 até R$ 2999,99</Cell>
              <Cell featured={true}>70%</Cell>
              <Cell>30%</Cell>
            </tr>
            <tr>
              <Cell odd>A partir de R$ 3000</Cell>
              <Cell odd featured={true}>
                80%
              </Cell>
              <Cell odd>20%</Cell>
            </tr>
          </tbody>
        </PriceTable>
      </PageSection>
      <PageSection
        headline="Agora virei expert"
        subheadline="E quero vender tudo que não uso mais"
      >
        <Column>
          <Center>
            <Image
              src="/images/wanna-sell-image.png"
              width={484}
              height={408}
            ></Image>
          </Center>
          <CTAButton onClick={null}>
            <Column>
              <ButtonPrimaryText>Quero Vender</ButtonPrimaryText>
              <ButtonSecondaryText>
                Mostre-me os próximos passos
              </ButtonSecondaryText>
            </Column>
          </CTAButton>
        </Column>
      </PageSection>
      <PageSection
        odd
        headline="Ainda tem dúvidas?"
        subheadline="Sem problemas! Listamos aqui as dúvidas mais frequentes e que talvez seja a sua também"
      >
        <Accordion
          square
          expanded={true}
          onChange={() => null}
          classes={{ expanded: classes.expanded, root: classes.root }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>Amet minim mollit non deserunt ullamco est sit...</Title>
          </AccordionSummary>
          <AccordionDetails style={{ maxWidth: 640 }}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              neque accusamus tempora quae, molestias necessitatibus porro
              mollitia illo voluptatem error aliquid dolorem non sed officiis
              sequi voluptate minus cumque deserunt!
            </p>
          </AccordionDetails>
        </Accordion>
        <SizedBox height={20}></SizedBox>
        <Accordion
          square
          expanded={false}
          onChange={() => null}
          classes={{ expanded: classes.expanded, root: classes.root }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>Amet minim mollit non deserunt ullamco est sit...</Title>
          </AccordionSummary>
          <AccordionDetails style={{ maxWidth: 640 }}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              neque accusamus tempora quae, molestias necessitatibus porro
              mollitia illo voluptatem error aliquid dolorem non sed officiis
              sequi voluptate minus cumque deserunt!
            </p>
          </AccordionDetails>
        </Accordion>
        <SizedBox height={20}></SizedBox>
        <Accordion
          square
          expanded={false}
          onChange={() => null}
          classes={{ expanded: classes.expanded, root: classes.root }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>Amet minim mollit non deserunt ullamco est sit...</Title>
          </AccordionSummary>
          <AccordionDetails style={{ maxWidth: 640 }}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              neque accusamus tempora quae, molestias necessitatibus porro
              mollitia illo voluptatem error aliquid dolorem non sed officiis
              sequi voluptate minus cumque deserunt!
            </p>
          </AccordionDetails>
        </Accordion>
        <SizedBox height={20}></SizedBox>
        <Accordion
          square
          expanded={false}
          onChange={() => null}
          classes={{ expanded: classes.expanded, root: classes.root }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>Amet minim mollit non deserunt ullamco est sit...</Title>
          </AccordionSummary>
          <AccordionDetails style={{ maxWidth: 640 }}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              neque accusamus tempora quae, molestias necessitatibus porro
              mollitia illo voluptatem error aliquid dolorem non sed officiis
              sequi voluptate minus cumque deserunt!
            </p>
          </AccordionDetails>
        </Accordion>
        <SizedBox height={20}></SizedBox>
        <Accordion
          square
          expanded={false}
          onChange={() => null}
          classes={{ expanded: classes.expanded, root: classes.root }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>Amet minim mollit non deserunt ullamco est sit...</Title>
          </AccordionSummary>
          <AccordionDetails style={{ maxWidth: 640 }}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              neque accusamus tempora quae, molestias necessitatibus porro
              mollitia illo voluptatem error aliquid dolorem non sed officiis
              sequi voluptate minus cumque deserunt!
            </p>
          </AccordionDetails>
        </Accordion>
        <SizedBox height={20}></SizedBox>
        <Accordion
          square
          expanded={false}
          onChange={() => null}
          classes={{ expanded: classes.expanded, root: classes.root }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>Amet minim mollit non deserunt ullamco est sit...</Title>
          </AccordionSummary>
          <AccordionDetails style={{ maxWidth: 640 }}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              neque accusamus tempora quae, molestias necessitatibus porro
              mollitia illo voluptatem error aliquid dolorem non sed officiis
              sequi voluptate minus cumque deserunt!
            </p>
          </AccordionDetails>
        </Accordion>
        <SizedBox height={20}></SizedBox>
        <Accordion
          square
          expanded={false}
          onChange={() => null}
          classes={{ expanded: classes.expanded, root: classes.root }}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Title>Amet minim mollit non deserunt ullamco est sit...</Title>
          </AccordionSummary>
          <AccordionDetails style={{ maxWidth: 640 }}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              neque accusamus tempora quae, molestias necessitatibus porro
              mollitia illo voluptatem error aliquid dolorem non sed officiis
              sequi voluptate minus cumque deserunt!
            </p>
          </AccordionDetails>
        </Accordion>
      </PageSection>
    </>
  );
}

export default WannaSellDesktop;
