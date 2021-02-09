import { Container, useMediaQuery } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Column from "../src/components/Atoms/Column";
import Padding from "../src/components/Atoms/Padding";
import RadioButtonWithLabel from "../src/components/Atoms/RadioButtonWithLabel";
import SizedBox from "../src/components/Atoms/SizedBox";
import ProductItem from "../src/components/Molecules/ProductItem";
import StaticBreadcrumbs from "../src/components/Molecules/StaticBreadcrumbs";
import Layout from "../src/components/Templates/Layout";
import Colors from "../src/enums/Colors";
import Menu from "../src/modules/menu/Menu";
import theme from "../src/theme/theme";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Filters = styled.div`
  width: 260px;
  margin-right: 20px;
`;

const FilterCard = styled.div`
  background-color: ${Colors.WHITE};
  padding: 16px 16px 8px 16px;
  border-radius: 4px;
`;

const FilterHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FilterTitle = styled.div`
  text-transform: uppercase;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  display: flex;
  align-items: center;
  letter-spacing: -0.005px;

  color: ${Colors.SECONDARY};
`;

const FilterCleanButton = styled.span`
  text-transform: uppercase;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 16px;
  cursor: pointer;

  display: flex;
  align-items: center;
  letter-spacing: -0.005px;

  color: ${Colors.PRIMARY};
`;

const Products = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 960px;
`;

const Sizes = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Size = styled.div<{ selected: boolean; noMargin?: boolean }>`
  display: flex;
  font-weight: ${(props) => (props.selected ? 700 : 400)};
  width: 51px;
  height: 28px;
  background-color: ${(props) => (props.selected ? Colors.PRIMARY : "#FBEFF7")};
  justify-content: center;
  align-items: center;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  color: ${(props) => (props.selected ? "#FBEFF7" : Colors.PRIMARY)};
  margin-right: ${(props) => (props.noMargin ? 0 : 8)}px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const Color = styled.div<{
  selected: boolean;
  color: string;
  noMargin?: boolean;
}>`
  display: flex;
  width: 51px;
  height: 28px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  font-family: Commissioner, Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  color: ${(props) => (props.selected ? "#FBEFF7" : Colors.PRIMARY)};
  opacity: ${(props) => (props.selected ? 1 : 0.25)};
  margin-right: ${(props) => (props.noMargin ? 0 : 8)}px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

function Search({ menu }: { menu: Menu }): JSX.Element {
  const isSmartphone = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();

  const {
    q,
    size,
    color,
    minPrice,
    maxPrice,
    category,
    brand,
    department,
  } = router.query;

  const { data: products, error: productsError } = useSWR("/products");

  const { data: sizes, error: sizesError } = useSWR("/sizes");

  const { data: colors, error: colorsError } = useSWR("/colors");

  console.log("products", products);

  console.log("q", q);
  console.log("size", size);
  console.log("color", color);

  const [section, setSection] = useState("woman");
  const [selectedSize, setSelectedSize] = useState(size);
  const [selectedColor, setSelectedColor] = useState(color);
  const [minSize, setMinSize] = useState(25);
  const [maxSize, setMaxSize] = useState(1200);

  return (
    <Layout menu={menu} containerMargin={false}>
      <Container maxWidth="lg" disableGutters>
        <SizedBox height={16}></SizedBox>
        <Padding horizontal={20}>
          <StaticBreadcrumbs
            showHome
            root={{ link: "pesquisa", title: q ? "Pesquisa" : "Produtos" }}
            category={q ? { link: `?q=${q}`, title: `"${q}"` } : null}
          ></StaticBreadcrumbs>
        </Padding>

        <SizedBox height={16}></SizedBox>
        <Row>
          <Filters>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Seção</FilterTitle>
              </FilterHead>
              <SizedBox height={5}></SizedBox>
              <Column>
                <RadioButtonWithLabel
                  label="Mulher"
                  onClick={() => setSection("woman")}
                  value={section === "woman"}
                ></RadioButtonWithLabel>
                <RadioButtonWithLabel
                  label="Kids"
                  onClick={() => setSection("kids")}
                  value={section === "kids"}
                ></RadioButtonWithLabel>
              </Column>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Tamanho</FilterTitle>
                <FilterCleanButton onClick={() => setSelectedSize("")}>
                  Limpar
                </FilterCleanButton>
              </FilterHead>
              <SizedBox height={16}></SizedBox>
              <Sizes>
                {sizes?.map((s: any, index: number) => (
                  <Size
                    key={s.value}
                    selected={selectedSize === s.value}
                    onClick={() => setSelectedSize(s.value)}
                    noMargin={(index + 1) % 4 === 0}
                  >
                    {s.value}
                  </Size>
                ))}
              </Sizes>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Cor</FilterTitle>
                <FilterCleanButton onClick={() => setSelectedColor("")}>
                  Limpar
                </FilterCleanButton>
              </FilterHead>
              <SizedBox height={16}></SizedBox>
              <Sizes>
                {colors &&
                  colors.map((s: any, index: number) => (
                    <Color
                      key={s.name}
                      selected={selectedColor === s.name}
                      onClick={() => setSelectedColor(s.name)}
                      noMargin={(index + 1) % 4 === 0}
                      color={s.hexColor}
                    ></Color>
                  ))}
              </Sizes>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Preço</FilterTitle>
                <FilterCleanButton>Limpar</FilterCleanButton>
              </FilterHead>
            </FilterCard>
            <SizedBox height={20}></SizedBox>
            <FilterCard>
              <FilterHead>
                <FilterTitle>Marcas</FilterTitle>
                <FilterCleanButton>Limpar</FilterCleanButton>
              </FilterHead>
            </FilterCard>
          </Filters>
          <Products>
            {products?.map((item: any, index: number) => (
              <span
                style={{
                  width: !isSmartphone && (index + 1) % 4 !== 0 ? 244 : 228,
                }}
                key={item.id}
              >
                <ProductItem data={item}></ProductItem>
                {!isSmartphone && (index + 1) % 4 !== 0 && (
                  <SizedBox width={16}></SizedBox>
                )}
                {isSmartphone && <SizedBox width={16}></SizedBox>}
              </span>
            ))}
          </Products>
        </Row>
      </Container>
    </Layout>
  );
}

export async function getStaticProps(): Promise<any> {
  const menuUrl = `${process.env.API_ENDPOINT}/menu`;
  const menuResult = await Axios.get(menuUrl);
  const menu = menuResult.data;

  return {
    props: {
      menu,
    },
    revalidate: 60,
  };
}

export default Search;
