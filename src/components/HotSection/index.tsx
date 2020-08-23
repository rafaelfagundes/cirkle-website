import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import Column from "../Column";
import Icon from "../Icon";
import ProductItem from "../ProductItem";
import SizedBox from "../SizedBox";
import Subtitle from "../Subtitle";
import Title from "../Title";
import Brand from "./brand";

const Section = styled.div<{ isSmartphone: boolean }>`
  padding: ${(props) =>
    props.isSmartphone ? "18px 0 32px 16px" : "18px 0 32px 0"};
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 320px;
  margin-left: -10px;
`;

const ItemsHolder = styled.div<{ disableScroll?: boolean }>`
  display: flex;
  flex-wrap: ${(props) => (props.disableScroll ? "wrap" : "nowrap")};
  flex-direction: row;
  align-items: center;
  overflow: ${(props) => (props.disableScroll ? "hidden" : "scroll")};
  justify-content: space-between;
`;

const BrandsHolder = styled.div<{ isSmartphone: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: ${(props) => (props.isSmartphone ? "16px" : 0)};
  flex-wrap: wrap;
`;

const Spacer = styled.div`
  content: "-";
  width: 0px;
  height: 0px;
  color: transparent;
`;

function HotSection({
  products,
  brands,
}: {
  products: {
    id: string;
    image: string;
    brandName: string;
    title: string;
    price: number;
    oldPrice: number;
    link: string;
  }[];
  brands: {
    id: string;
    name: string;
    image: string;
    link: string;
  }[];
}): JSX.Element {
  const theme = useTheme();
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Section isSmartphone={isSmartphone}>
      <SectionTitle>
        <Icon type="thermometer" size={48}></Icon>
        <Column>
          <Title size={18}>EM ALTA</Title>
          <SizedBox height={6}></SizedBox>
          <Subtitle size={18}>Produtos que todo mundo está de olho</Subtitle>
        </Column>
      </SectionTitle>
      <SizedBox height={16}></SizedBox>
      <ItemsHolder disableScroll={!isSmartphone}>
        {products.map((item) => (
          <ProductItem data={item} key={item.id}></ProductItem>
        ))}
        {isSmartphone ? <Spacer>-</Spacer> : null}
      </ItemsHolder>
      <SizedBox height={20}></SizedBox>
      <BrandsHolder isSmartphone={isSmartphone}>
        {brands.map((item) => (
          <Brand key={item.id} data={item}></Brand>
        ))}
      </BrandsHolder>
    </Section>
  );
}

export default HotSection;
